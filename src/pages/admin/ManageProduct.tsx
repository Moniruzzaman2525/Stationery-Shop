/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table, Skeleton, TableColumnsType, TableProps, Popconfirm } from "antd";
import { useEffect } from "react";
import { useGetAllProductsQuery } from "../../redux/feathers/product/productApi";
import { TProduct } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { useDeleteProductMutation } from "../../redux/feathers/admin/adminApi";

export type TTableData = Pick<
  TProduct,
  "_id" | "photo" | "name" | "brand" | "category" | "price" | "stock"
>;

export const ManageProduct = () => {
  const location = useLocation();
  const { data: semesterData, isFetching, refetch } = useGetAllProductsQuery(undefined);
  const [deleteProduct] = useDeleteProductMutation()
  const navigate = useNavigate()

  const tableData: readonly TTableData[] | undefined = semesterData?.data?.map(
    ({ _id, photo, name, brand, category, price, stock }) => ({
      _id,
      photo,
      name,
      brand,
      category,
      price,
      stock,
    })
  );

  useEffect(() => {
    if (location.state?.refresh) {
      refetch()
    }
  }, [location, refetch]);


  const updateProduct = (id: string) => {
    navigate(`/dashboard/update-product/${id}`);
  }

  const deleteProductFn = async (id: string) => {
    const res = await deleteProduct(id)
    if (res) {
      refetch()
    }

  }

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string) => (
        <img
          src={photo}
          alt="Product"
          className="w-16 h-16 object-cover rounded-md"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: boolean) => (stock ? "In Stock" : "Out of Stock"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center space-x-2">
          <button className="bg-[#001845] cursor-pointer !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition" onClick={() => updateProduct(record._id)}>Update</button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => deleteProductFn(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="bg-[#001845] cursor-pointer !ml-4 !text-white px-6 py-2 rounded-lg hover:bg-[#003366] transition">
              Delete
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
    console.log("Table params changed:", { filters, extra });
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Manage Products</h1>
      {isFetching ? (
        <Skeleton active />
      ) : (
        <Table
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          loading={isFetching}
          scroll={{ x: "max-content" }}
          rowKey={(record) => record._id}
          bordered
          pagination={{ pageSize: 5}}
          className="rounded-lg shadow-md"
        />
      )}
    </div>
  );
};
