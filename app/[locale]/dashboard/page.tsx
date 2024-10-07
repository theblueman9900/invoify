"use client";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column, ColumnFilterElementTemplateOptions } from "primereact/column";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import { Demo } from "@/types";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { SalesOrderService } from "@/services/SalesOrderService";
import { Skeleton } from "primereact/skeleton";
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Sidebar } from "primereact/sidebar";
import { SplitButton } from "primereact/splitbutton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface InputValue {
  name: string;
  code: string;
}

const SalesOrderManagement = () => {
  let emptySalesOrder: Demo.SalesOrder = {};
  let emptyPurchaseOrder: Demo.PurchaseOrder = {};
  let emptyInternalOrder: Demo.InternalOrder = {};
  let emptyProcess: Demo.Process = {};
  const router = useRouter();
  const dt = useRef<DataTable<any>>(null);
  const toast = useRef<Toast>(null);

  const [customers, setCustomers] = useState<Demo.Customer[]>([]);
  const [salesOrders, setSalesOrders] = useState<Demo.SalesOrder[]>([]);
  const [orderItems, setOrderItems] = useState<Demo.OrderItem[]>([]);
  const [items, setItems] = useState<Demo.Item[]>([]);
  const [allRecipes, setSetAllRecipes] = useState<Demo.Recipe[]>([]);
  const [suppliersByItem, setSuppliersByItem] = useState<any>();
  const [allTransferableDepartment, setTransferableAllDepartment] = useState<
    Demo.Department[]
  >([]);
  const [defaultIntakeDepartment, setDefaultIntakeDepartment] =
    useState<Demo.Department>();
  const [defaultOutletDepartment, setDefaultOutletDepartment] =
    useState<Demo.Department>();
  const [salesOrderFilters, setSalesOrderFilters] =
    useState<DataTableFilterMeta>({});
  const [loading, setLoading] = useState(true);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [salesOrderDialog, setSalesOrderDialog] = useState(false);
  const [internalOrderDialog, setInternalOrderDialog] = useState(false);
  const [salesOrderUpdateDialog, setSalesOrderUpdateDialog] = useState(false);
  const [salesOrderStatusUpdateDialog, setSalesOrderStatusUpdateDialog] =
    useState(false);
  const [deleteSalesOrderDialog, setDeleteSalesOrderDialog] = useState(false);
  const [deleteSalesOrdersDialog, setDeleteSalesOrdersDialog] = useState(false);
  const [deliverSalesOrdersDialog, setDeliverSalesOrdersDialog] =
    useState(false);
  const [selectedSalesOrders, setSelectedSalesOrders] = useState<
    Demo.SalesOrder[]
  >([]);
  const [selectedSalesOrderItems, setSelectedSalesOrderItems] = useState<
    Demo.OrderItem[]
  >([]);
  const [
    selectedSalesOrderProcessingItems,
    setSelectedSalesOrderPrrocessingItems,
  ] = useState<Demo.OrderItem[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [updateSalesOrderSubmitted, setUpdateSalesOrderSubmitted] =
    useState(false);
  const [donorDropdownValue, setDonorDropdownValue] = useState(null);
  const [departmentDonorDropdownValue, setDepartmentDonorDropdownValue] =
    useState(null);
  const [
    donorDropdownValueForPurchaseOrder,
    setDonorDropdownValueForPurchaseOrder,
  ] = useState<any>(null);
  const [orderItemName, setOrderItemName] = useState("");
  const [orderItemId, setOrderItemId] = useState(null);
  const [orderItemRecepies, setOrderItemRecepies] = useState<
    Demo.Recipe[] | null
  >(null);
  const [orderItemRecepiesIngredients, setOrderItemRecepiesIngredients] =
    useState<Demo.Ingredient[]>([]);
  const [selectedAutoValue, setSelectedAutoValue] = useState(null);
  const [autoFilteredValue, setAutoFilteredValue] = useState<Demo.Item[]>([]);
  const [inputNumberValue, setInputNumberValue] = useState<number | null>();
  const [visibleRight, setVisibleRight] = useState(false);
  const [inventoriesByItem, setInventoriesByItem] = useState<
    Demo.InventoryByItem[]
  >([]);
  const [purchaseOrderDialog, setPurchaseOrderDialog] = useState(false);
  const [salesOrder, setSalesOrder] =
    useState<Demo.SalesOrder>(emptySalesOrder);
  const [purchaseOrder, setPurchaseOrder] =
    useState<Demo.PurchaseOrder>(emptyPurchaseOrder);
  const [internalOrder, setInternalOrder] =
    useState<Demo.InternalOrder>(emptyInternalOrder);
  const [process, setProcess] = useState<Demo.Process>(emptyProcess);
  const [purchaseOrders, setPurchaseOrders] = useState<Demo.PurchaseOrder[]>(
    []
  );
  const [ingredient, setIngredient] = useState<Demo.Ingredient>();
  const [internalOrders, setInternalOrders] = useState<Demo.InternalOrder[]>(
    []
  );
  const [processes, setProcesses] = useState<Demo.Process[]>([]);
  const [itemsUnderProcess, setItemsUnderProcess] = useState<any[]>([]);
  const [visibleFullScreen, setVisibleFullScreen] = useState(false);
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [controlledDepartments, setControlledDepartments] = useState<
    Demo.Department[]
  >([]);
  const [userId, setUserId] = useState<any>(null);
  const [departments, setDepartments] = useState<Demo.Department[]>([]);

  useEffect(() => {
    const isAdmin = Cookies.get("role")?.toLowerCase() == "admin";
    setIsAdmin(isAdmin);
    const userID = Cookies.get("_id");
    setUserId(userID);
  }, []);

  useEffect(() => {
    setLoading(true);
    SalesOrderService.getAllSalesOrder().then((data) => {
      setSalesOrders(getSalesOrders(data));
      setLoading(false);
    });
    initSalesOrderFilters();
  }, []);

  useEffect(() => {
    if (isAdmin && userId) {
      setControlledDepartments(departments);
    } else {
      setControlledDepartments(
        departments?.filter(
          (department) =>
            (department?.incharge as unknown as Demo.User)?._id == userId
        )
      );
    }
  }, [departments, userId, isAdmin]);

  useEffect(() => {
    setLoading(true);
    setOrderItemRecepiesIngredients(
      getRecipIngredients(orderItemRecepies as Demo.Recipe[])
    );
    setLoading(false);
  }, [orderItemRecepies, purchaseOrders]);

  useEffect(() => {
    const FORM_FILL_VALUES = {
      sender: {
        name: "John Doe",
        address: "123 Main St",
        zipCode: "12345",
        city: "Anytown",
        country: "USA",
        email: "johndoe@example.com",
        phone: "123-456-7890",
      },
      receiver: {
        name: (salesOrder?.customer as Demo.Customer)?.name ?? "",
        address: (salesOrder?.customer as Demo.Customer)?.address ?? "",
        zipCode: "",
        city: "",
        country: "",
        email: (salesOrder?.customer as Demo.Customer)?.email ?? "",
        phone: (salesOrder?.customer as Demo.Customer)?.contactNumber ?? "",
      },
      details: {
        invoiceLogo: "",
        invoiceNumber: "INV0001",
        invoiceDate: new Date(),
        dueDate: new Date(),
        items: salesOrder?.orderItems?.map((product) => {
          return {
            name: (product?.item as Demo.Item)?.name,
            description: (product?.item as Demo.Item)?.description,
            quantity: product?.quantity,
            unitPrice: product?.rate,
            total: (product?.rate ?? 0) * (product?.quantity ?? 0),
          };
        }),
        currency: "INR",
        language: "English",
        taxDetails: {
          amount: 0,
          amountType: "amount",
          taxID: "",
        },
        discountDetails: {
          amount: 0,
          amountType: "amount",
        },
        shippingDetails: {
          cost: 0,
          costType: "amount",
        },
        paymentInformation: {
          bankName: "",
          accountName: "",
          accountNumber: "",
        },
        additionalNotes: "",
        paymentTerms: "",
        totalAmountInWords: "",
        pdfTemplate: 1,
      },
    };
    setInvoiceData(FORM_FILL_VALUES);
  }, [salesOrder]);

  useEffect(() => {
    const ingredientsInProcess = Object.values(
      groupAndSumQuantitiesOfIngredientItem(
        Object.values(
          groupAndSumQuantitiesOfProcessItem(
            processes
              ?.filter((p) => p?.processStatus != "closed")
              .map((process) => {
                return {
                  ...process,
                  processItems: process?.processItems?.map((processItem) => {
                    return {
                      ...processItem,
                      processId: process?._id,
                      processingDepartment: (
                        process?.processingDepartment as Demo.Department
                      )?._id,
                      processCode: process?.processCode as string,
                      order: (process?.order as Demo.SalesOrder)?._id,
                    };
                  }),
                };
              })
              .map((p) => p?.processItems)
              .flat()
          )
        )
          .map((processItem: any) => {
            const ingredientsInProcess = allRecipes
              .find(
                (recipe) =>
                  (recipe?.finishedItem as Demo.Item)._id ===
                  (processItem?.item as Demo.Item)?._id
              )
              ?.ingredientList?.map((ing) => {
                const quantityInProcessingDepartmdent = inventoriesByItem
                  ?.find(
                    (inventory) =>
                      inventory?.itemName == (ing?.item as Demo.Item)?._id
                  )
                  ?.departments?.find(
                    (department) =>
                      (department?.entry?.department as Demo.Department)?._id ==
                      processItem?.processingDepartment
                  )?.entry?.quantity;
                return {
                  ...ing,
                  quantityToProcess:
                    (processItem?.quantity ?? 0) * (ing?.quantity ?? 0) -
                    (quantityInProcessingDepartmdent ?? 0),
                };
              });
            return {
              ...processItem,
              ingredientsInProcess,
            };
          })
          .map((p: any) => p?.ingredientsInProcess)
          .flat()
      )
    );
    setItemsUnderProcess(ingredientsInProcess);
  }, [processes, allRecipes]);

  const clearFilter1 = () => {
    initSalesOrderFilters();
  };

  const onGlobalFilterChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _salesOrderFilter = { ...salesOrderFilters };
    (_salesOrderFilter["global"] as any).value = value;

    setSalesOrderFilters(_salesOrderFilter);
    setGlobalFilterValue1(value);
  };

  const formatUtcDateToLocal = (value: Date) => {
    return new Date(value).toLocaleDateString();
  };

  const initSalesOrderFilters = () => {
    setSalesOrderFilters({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      orderCode: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "customer.name": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "customer.contactPersonName": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "customer.email": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      "customer.contactNumber": {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      reason: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      orderStatus: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
      date: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
      },
      verified: { value: null, matchMode: FilterMatchMode.EQUALS },
    });
    setGlobalFilterValue1("");
  };

  const getSalesOrders = (data: any[]) => {
    return [...(data || [])].map((d, index) => {
      d.date = new Date(d.createdAt);
      d.index = index + 1;
      return d;
    });
  };

  const getSalesOrderWithOutIndex = (data: any) => {
    const modifiedOrderItems = data.orderItems?.map((orderItem: any) => {
      const itemInDefaultOutletDepartment = inventoriesByItem
        .find((i: any) => i?.item?._id == orderItem?._id)
        ?.departments?.find(
          (i) => (i?.entry?.department as Demo.Department)?.isDefaultOutlet
        );
      const stockPresentInInventory =
        itemInDefaultOutletDepartment?.entry?.quantity ?? 0;
      const processState = processes
        ?.filter(
          (p) =>
            (p?.order as Demo.SalesOrder)?._id == data?._id &&
            (p?.processItems as Demo.ProcessItem[])?.filter(
              (i) => (i?.item as Demo.Item)?._id == orderItem?._id
            ).length > 0
        )
        .map((p) =>
          p?.processItems?.map((processItem) => {
            return {
              ...processItem,
              processStatus: p.processStatus,
            };
          })
        )
        .flat()
        .find(
          (i) => (i?.item as Demo.Item)?._id == orderItem?._id
        )?.processStatus;
      const stockState =
        salesOrder?.orderStatus?.toLowerCase() == "closed"
          ? "delivered"
          : !processState &&
            (stockPresentInInventory ?? 0) - (orderItem?.quantity ?? 0) >= 0
          ? "in-stock"
          : !processState &&
            (stockPresentInInventory ?? 0) - (orderItem?.quantity ?? 0) < 0 //
          ? "nil"
          : processState == "closed" &&
            (stockPresentInInventory ?? 0) - (orderItem?.quantity ?? 0) >= 0 //
          ? "ready"
          : processState == "closed" &&
            (stockPresentInInventory ?? 0) - (orderItem?.quantity ?? 0) < 0 //
          ? "processed"
          : "pending";

      return {
        ...orderItem,
        item: orderItem?.item as Demo.Item,
        stockPresentInInventory,
        stockState,
      };
    });
    var newSalesOrder = {
      ...data,
      orderItems: modifiedOrderItems,
      date: new Date(data.createdAt),
    };
    return newSalesOrder;
  };
  const onboardingDateBodyTemplate = (rowData: any) => {
    return formatUtcDateToLocal(rowData.date!);
  };

  const onBoardingDateFilterTemplate = (
    options: ColumnFilterElementTemplateOptions
  ) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="dd/mm/yy"
        placeholder="dd/mm/yyyy"
        mask="99/99/9999"
      />
    );
  };

  const statusBodyTemplate = (rowData: Demo.SalesOrder) => {
    return (
      <span className={`order-badge status-${rowData.orderStatus}`}>
        {rowData?.orderStatus}
      </span>
    );
  };

  const openNew = () => {
    setSalesOrder(emptySalesOrder);
    setSubmitted(false);
    setSalesOrderDialog(true);
  };

  const editSalesOrder = (salesOrder: any) => {
    salesOrder.orderItems = salesOrder.orderItems?.map((item: any) => {
      return {
        ...item,
        itemName: (item.item as Demo.Item).name,
      };
    });
    setSalesOrder({ ...salesOrder });
    setOrderItems(salesOrder.orderItems ?? []);
    setSalesOrderUpdateDialog(true);
  };

  const setSalesOrderDetailsData = (salesOrder: Demo.SalesOrder) => {
    setSalesOrder(getSalesOrderWithOutIndex({ ...salesOrder }));
    setVisibleRight(true);
  };

  const confirmDeleteSalesOrder = (salesOrder: Demo.SalesOrder) => {
    setSalesOrder(salesOrder);
    setDeleteSalesOrderDialog(true);
  };

  const exportCSV = () => {
    dt.current?.exportCSV();
  };

  const confirmDeleteSelected = () => {
    setDeleteSalesOrdersDialog(true);
  };

  const groupAndSumQuantities = (
    ingredientLists: any
  ): { [key: string]: any } => {
    const groupedIngredients: { [key: string]: any } = {};

    ingredientLists.flat().forEach((ingredient: any) => {
      const itemId = ingredient.item._id;
      if (groupedIngredients[itemId]) {
        groupedIngredients[itemId] = {
          ...ingredient,
          quantity:
            (groupedIngredients[itemId]?.quantity ?? 0) + ingredient.quantity,
        };
      } else {
        groupedIngredients[itemId] = {
          ...ingredient,
          quantity: ingredient.quantity,
        };
      }
    });

    return groupedIngredients;
  };

  const groupAndSumQuantitiesOfProcessItem = (
    itemLists: any
  ): { [key: string]: any } => {
    const groupedItems: { [key: string]: any } = {};

    itemLists?.flat()?.forEach((item: any) => {
      const itemId = item?.item?._id;
      if (groupedItems[itemId]) {
        groupedItems[itemId] = {
          ...item,
          quantity:
            (groupedItems[itemId]?.quantity ?? 0) + (item?.quantity ?? 0),
        };
      } else {
        groupedItems[itemId] = { ...item, quantity: item?.quantity ?? 0 };
      }
    });

    return groupedItems;
  };

  const groupAndSumQuantitiesOfIngredientItem = (
    itemLists: any
  ): { [key: string]: any } => {
    const groupedItems: { [key: string]: any } = {};

    itemLists.flat().forEach((item: any) => {
      const itemId = item?.item?._id;
      if (groupedItems[itemId]) {
        groupedItems[itemId] = {
          ...item,
          quantityToProcess:
            (groupedItems[itemId]?.quantityToProcess ?? 0) +
            item?.quantityToProcess,
        };
      } else {
        groupedItems[itemId] = {
          ...item,
          quantityToProcess: item?.quantityToProcess,
        };
      }
    });

    return groupedItems;
  };

  const getRecipIngredients = (recipes: Demo.Recipe[]): any[] => {
    if (!recipes || recipes.length === 0) return [];

    const listOfIngredients = recipes
      .map((recipe: any) => {
        return {
          ...recipe,
          ingredientList: recipe?.ingredientList?.map((ingredient: any) => {
            return {
              ...ingredient,
              quantity:
                (recipe?.finishedItemOrdered?.quantity ?? 0) *
                (ingredient?.quantity ?? 0),
            };
          }),
        };
      })
      .map((recipe: any) => {
        return recipe?.ingredientList;
      });
    const result = Object.values(groupAndSumQuantities(listOfIngredients));
    const result2 = result.map((ingredient: any) => {
      const quantityOrdered = purchaseOrders
        .filter((p) => p.orderStatus === "open")
        .flatMap((p) =>
          (p.orderItems as Demo.OrderItem[]).filter(
            (o) =>
              (o?.item as Demo.Item)?._id ===
              (ingredient?.item as Demo.Item)?._id
          )
        )
        .reduce((total, o) => total + (o?.quantity ?? 0), 0);

      const quantityUnderProcessing =
        itemsUnderProcess?.find(
          (i) =>
            (i?.item as Demo.Item)?._id === (ingredient?.item as Demo.Item)?._id
        )?.quantityToProcess ?? 0;
      const itemInDefaultDepartment = inventoriesByItem
        ?.find(
          (i) =>
            (i?.item as unknown as Demo.Item)?._id ===
            (ingredient?.item as Demo.Item)?._id
        )
        ?.departments?.find(
          (i) => (i.entry.department as Demo.Department)?.isDefaultIntake
        );
      const itemQuantityInNonDefaultDepartment = inventoriesByItem
        ?.find(
          (i) =>
            (i?.item as unknown as Demo.Item)?._id ===
            (ingredient?.item as Demo.Item)?._id
        )
        ?.departments?.filter(
          (i) => !(i.entry.department as Demo.Department)?.isDefaultIntake
        )
        ?.map((departmentEntry) => departmentEntry?.entry)
        ?.map((entry) => entry?.quantity)
        ?.reduce((a, b) => (a ?? 0) + (b ?? 0), 0);
      const quantityInStock = itemInDefaultDepartment?.entry?.quantity ?? 0;
      const quantityInOteherStock = itemQuantityInNonDefaultDepartment ?? 0;
      const quantityUnderProcessingInStore =
        quantityUnderProcessing <= 0
          ? 0
          : (quantityUnderProcessing ?? 0) - (quantityInOteherStock ?? 0);

      const quantityToOrder =
        ingredient.quantity -
        ((quantityInStock ?? 0) +
          (quantityOrdered ?? 0) -
          (quantityUnderProcessingInStore ?? 0));
      const status =
        ingredient.quantity <=
        (quantityInStock ?? 0) - (quantityUnderProcessingInStore ?? 0)
          ? "in-stock"
          : ingredient.quantity <=
            (quantityInStock ?? 0) +
              (quantityOrdered ?? 0) -
              (quantityUnderProcessingInStore ?? 0)
          ? "ordered"
          : quantityInStock > 0
          ? "inadequate"
          : "off-stock";
      return {
        ...ingredient,
        quantityOrdered: quantityOrdered,
        quantityUnderProcessing: quantityUnderProcessing,
        quantityUnderProcessingInStore: quantityUnderProcessingInStore,
        quantityInStock: quantityInStock,
        quantityToOrder: quantityToOrder,
        quantityInOteherStock: quantityInOteherStock,
        status: status,
      };
    });
    return result2;
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {isAdmin && (
          <div className="my-2">
            <Button
              label="New"
              icon="pi pi-plus"
              severity="help"
              className="mr-2"
              onClick={openNew}
            />
            <Button
              label="Delete"
              icon="pi pi-trash"
              severity="danger"
              outlined={
                !selectedSalesOrders || !(selectedSalesOrders as any).length
              }
              onClick={confirmDeleteSelected}
              disabled={
                !selectedSalesOrders || !(selectedSalesOrders as any).length
              }
            />
          </div>
        )}
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Export"
          outlined
          icon="pi pi-upload"
          severity="help"
          onClick={exportCSV}
        />
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData: Demo.SalesOrder) => {
    return (
      <>
        {isAdmin && (
          <span className="p-buttonset flex">
            <Button
              label=""
              outlined
              icon="pi pi-pencil"
              severity="info"
              onClick={() => editSalesOrder(rowData)}
            />
            <Button
              type="button"
              icon="pi pi-arrow-left"
              severity="warning"
              outlined
              onClick={() => setSalesOrderDetailsData(rowData)}
            />
            <Button
              label=""
              outlined
              icon="pi pi-trash"
              rounded
              severity="danger"
              onClick={() => confirmDeleteSalesOrder(rowData)}
            />
          </span>
        )}
      </>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          outlined
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header1 = renderHeader();

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Sales Order</h5>
          <Toast ref={toast} />
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>

          {loading && (
            <div className="card">
              <div className="p-1">
                <div className="flex mb-3">
                  <Skeleton
                    width="3rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="4rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="16rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                </div>
                <div className="flex mb-3">
                  <Skeleton
                    width="3rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="4rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="16rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                </div>
                <div className="flex mb-3">
                  <Skeleton
                    width="3rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="4rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="16rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                </div>
                <div className="flex mb-3">
                  <Skeleton
                    width="3rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="4rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="16rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                </div>
                <div className="flex mb-3">
                  <Skeleton
                    width="3rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="4rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="16rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                </div>
                <div className="flex mb-3">
                  <Skeleton
                    width="3rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="4rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="14rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="12rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    width="16rem"
                    height="4rem"
                    className="mb-2 mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                  <Skeleton
                    shape="circle"
                    size="4rem"
                    className="mr-2"
                  ></Skeleton>
                </div>
                <div className="flex justify-content-center mt-3 gap-3">
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                  <Skeleton width="2rem" height="2rem"></Skeleton>
                  <Skeleton width="2rem" height="2rem"></Skeleton>
                  <Skeleton width="4rem" height="2rem"></Skeleton>
                </div>
              </div>
            </div>
          )}

          {!loading && (
            <DataTable
              ref={dt}
              value={salesOrders}
              selection={selectedSalesOrders}
              onSelectionChange={(e) => setSelectedSalesOrders(e.value as any)}
              dataKey="_id"
              paginator
              className="database-responsive"
              showGridlines
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} SalesOrders"
              filters={salesOrderFilters}
              filterDisplay="menu"
              loading={loading}
              responsiveLayout="scroll"
              emptyMessage="No Sales Order found."
              header={header1}
            >
              <Column
                selectionMode="multiple"
                headerStyle={{ width: "3rem" }}
              ></Column>
              <Column field="index" header="#" style={{ minWidth: "2rem" }} />
              <Column
                field="orderCode"
                header="Order Code"
                sortable
                filter
                filterPlaceholder="Search by Code"
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="customer.name"
                header="Customer"
                sortable
                filter
                filterPlaceholder="Search by Customer"
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="customer.contactPersonName"
                header="Contact Person"
                sortable
                filter
                filterPlaceholder="Search by Contact Person"
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="customer.email"
                header="Email"
                sortable
                filter
                filterPlaceholder="Search by Email"
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="customer.contactNumber"
                header="Contact Number"
                sortable
                filter
                filterPlaceholder="Search by Contact Number"
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="reason"
                header="Reason"
                sortable
                filter
                filterPlaceholder="Search by Reason"
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="orderStatus"
                header="Status"
                sortable
                filter
                filterPlaceholder="Search by Status"
                style={{ minWidth: "12rem" }}
                body={statusBodyTemplate}
              />
              <Column
                field="date"
                filterField="date"
                header="Created At"
                sortable
                dataType="date"
                style={{ minWidth: "10rem" }}
                body={onboardingDateBodyTemplate}
                filter
                filterElement={onBoardingDateFilterTemplate}
              />
              <Column
                style={{ maxWidth: "8rem" }}
                body={actionBodyTemplate}
              ></Column>
            </DataTable>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesOrderManagement;
