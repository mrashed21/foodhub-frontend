"use client";
import { MenuInterface, useMenus } from "@/api/provider-api/menu/menu.api";
import Header from "@/components/custom/header";
import { SearchField } from "@/components/custom/search-field";
import { Button } from "@/components/ui/button";
import useSerialNumber from "@/hook/use-serial";
import { useState } from "react";
import MenuCreate from "./menu-create";
import MenuTable from "./menu-table";
import MenuUpdate from "./menu-update";

const Menu = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [editData, setEditData] = useState<MenuInterface | null>(null);
  //! get menus
  const { data: menus, isLoading } = useMenus({ page, limit, search });

  // *dynamic serial with page, limit
  const serialNumber = useSerialNumber(page, limit);

  const handleEdit = (menu: MenuInterface) => {
    setEditData(menu);
    setIsUpdateModalOpen(true);
  };
  return (
    <section className="space-y-6 w-full">
      {/* //? Header  */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-5">
          {/* //? Header */}
          <Header title={"Menus"} description={"Manage and search all menus"} />
          <Button onClick={() => setIsCreateModalOpen(true)}>
            Create Menu
          </Button>
        </div>
      </div>

      {/* //? Search  */}
      <div className="w-full max-w-sm overflow-hidden">
        <SearchField
          placeholder="Search menus..."
          onSearch={(v) => {
            setPage(1);
            setSearch(v);
          }}
        />
      </div>

      {/* menu table */}
      <MenuTable
        menuData={menus?.data?.data}
        isLoading={isLoading}
        serialNumber={serialNumber}
        handleEdit={handleEdit}
      />

      {/* create modal */}
      <MenuCreate
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      {/* update modal */}
      <MenuUpdate
        open={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        editData={editData}
      />
    </section>
  );
};

export default Menu;
