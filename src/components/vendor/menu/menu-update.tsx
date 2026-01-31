"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { MenuInterface, useUpdateMenu } from "@/api/provider-api/menu/menu.api";
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

interface CategoryOption extends SelectOption {}

interface MenuUpdateFormValues {
  name: string;
  description: string;
  price: number;
  category: CategoryOption | null;
  cuisine: string;
  isAvailable: boolean;
  image?: string;
}

const MenuUpdate = ({
  open,
  onOpenChange,
  editData,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData: MenuInterface | null;
}) => {
  const imageUrlRegex = /^(https?:\/\/).+\.(jpg|jpeg|png|webp|gif|svg)$/i;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<MenuUpdateFormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: null,
      cuisine: "",
      isAvailable: true,
      image: "",
    },
  });

  const { data: categories, isLoading } = usePublicCategories();

  const categoryOptions: CategoryOption[] =
    categories?.data?.data?.map((item: any) => ({
      label: item.name,
      value: item.id,
    })) || [];

  const { mutateAsync, isPending } = useUpdateMenu();

  useEffect(() => {
    if (!editData) return;

    reset({
      name: editData.name,
      description: editData.description,
      price: editData.price,
      category: editData.category
        ? {
            label: editData.category.name,
            value: editData.category.id,
          }
        : null,
      cuisine: editData.cuisine.join(", "),
      isAvailable: editData.isAvailable,
      image: editData.image ?? "",
    });
  }, [editData, reset]);

  const onSubmit = async (values: MenuUpdateFormValues) => {
    if (!editData) return;

    if (!values.category) {
      toast.error("Category is required");
      return;
    }

    const toastId = toast.loading("Updating menu...");

    try {
      await mutateAsync({
        id: editData.id,
        name: values.name,
        description: values.description,
        price: values.price,
        categoryId: values.category.value as string,
        cuisine: values.cuisine
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        isAvailable: values.isAvailable,
        image: values.image || undefined,
      });

      toast.success("Menu updated successfully 🎉", {
        id: toastId,
      });

      onOpenChange(false);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update menu", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Menu</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Menu Name</label>
            <Input
              placeholder="Menu name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name?.message && (
              <p className="text-sm text-red-500">
                {String(errors.name.message)}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description?.message && (
              <p className="text-sm text-red-500">
                {String(errors.description.message)}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Price</label>
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
              <p className="text-sm text-red-500">
                {String(errors.price.message)}
              </p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
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
              <p className="text-sm text-red-500">
                {String(errors.category.message)}
              </p>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <Input
              placeholder="https://example.com/menu.jpg"
              {...register("image", {
                validate: (value) =>
                  !value ||
                  imageUrlRegex.test(value) ||
                  "Please enter a valid image URL",
              })}
            />
            {errors.image?.message && (
              <p className="text-sm text-red-500 mt-1">
                {String(errors.image.message)}
              </p>
            )}
          </div>

          {/* Cuisine */}
          <div className="space-y-1">
            <label className="text-sm font-medium">
              Cuisine{" "}
              <span className="text-xs text-muted-foreground">
                (comma separated)
              </span>
            </label>
            <Input placeholder="e.g. Chinese, Thai" {...register("cuisine")} />
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between pt-2">
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
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MenuUpdate;
