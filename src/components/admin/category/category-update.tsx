"use client";

import {
  CategoryInterface,
  useUpdateCategory,
} from "@/api/admin-api/category/category.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { slugify } from "@/hook/slugify";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface CategoryUpdateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editData: CategoryInterface | null;
}

type FormValues = {
  name: string;
  isActive: boolean;
};

const CategoryUpdate = ({
  open,
  onOpenChange,
  editData,
}: CategoryUpdateProps) => {
  const { mutateAsync, isPending } = useUpdateCategory();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (open && editData) {
      reset({
        name: editData.name,
        isActive: editData.isActive,
      });
    }
  }, [open, editData, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!editData?.id) return;

    try {
      await mutateAsync({
        payload: {
          id: editData.id,
          name: data.name,
          slug: slugify(data.name),
          isActive: data.isActive,
        },
      });

      toast.success("Category updated successfully");

      reset();
      onOpenChange(false);
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update category",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              placeholder="Category name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Active */}
          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <Switch
              checked={watch("isActive")}
              onCheckedChange={(v) => setValue("isActive", v)}
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
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

export default CategoryUpdate;
