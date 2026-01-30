"use client";

import { Controller, useForm } from "react-hook-form";

import { useCreateMenu } from "@/api/provider-api/menu/menu.api";
import { usePublicCategories } from "@/api/public-api/category.api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CustomSelect, { SelectOption } from "@/components/custom/custom-select";
import { toast } from "sonner";

//! Types

interface CategoryOption extends SelectOption {}

interface MenuCreateFormValues {
  name: string;
  description: string;
  price: number;
  category: CategoryOption | null;
  cuisine: string;
  isAvailable: boolean;
}

const MenuCreate = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MenuCreateFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: null,
      cuisine: "",
      isAvailable: true,
    },
  });

  
  //! create menu
  const { mutateAsync, isPending } = useCreateMenu();
  
  //! fetch categories
  const { data: categories, isLoading } = usePublicCategories();

  //! category options
  const categoryOptions: CategoryOption[] =
    categories?.data?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

    
  //! Submit

  const onSubmit = async (values: MenuCreateFormValues) => {
    if (!values.category) {
      toast.error("Category is required");
      return;
    }

    const toastId = toast.loading("Creating menu...");

    try {
      await mutateAsync({
        name: values.name,
        description: values.description,
        price: values.price,
        categoryId: values.category.value as string,
        cuisine: values.cuisine
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        isAvailable: values.isAvailable,
      });

      toast.success("Menu created successfully 🎉", {
        id: toastId,
      });

      reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create menu", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Menu</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Menu Name</label>
            <Input
              placeholder="Menu name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Textarea
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.description.message)}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <Input
              type="text"
              inputMode="decimal"
              placeholder="Price"
              {...register("price", {
                required: "Price is required",
                min: { value: 1, message: "Price must be greater than 0" },
                setValueAs: (v) => (v === "" ? 0 : Number(v)),
                onChange: (e) => {
                  e.target.value = e.target.value.replace(/[^0-9.]/g, "");
                },
              })}
            />
            {errors.price?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.price.message)}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <CustomSelect<CategoryOption>
                  placeholder="Select category"
                  options={categoryOptions}
                  value={field.value}
                  onChange={field.onChange}
                  isSearchable
                  isClearable
                  isDisabled={isLoading}
                />
              )}
            />
            {errors.category?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.category.message)}
              </p>
            )}
          </div>

          {/* Cuisine */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cuisine{" "}
              <span className="text-xs text-muted-foreground">
                (comma separated)
              </span>
            </label>
            <Input placeholder="e.g. Chinese, Thai" {...register("cuisine")} />
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Available</label>
            <Controller
              name="isAvailable"
              control={control}
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenuCreate;
