import React, { useEffect } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css"; // Import the stylesheet
import { Demo } from "@/types";
import { BaseButton } from "@/app/components";
import { Moon, Sun, ScrollText } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { FORM_FILL_VALUES } from "@/lib/variables";
export default function CustomDataTable({ data }: { data: Demo.SalesOrder[] }) {
  const { reset, formState } = useFormContext();
  useEffect(() => {
    const tableElement = document.querySelector("#filter-table");
    if (tableElement) {
      const timeoutId = setTimeout(() => {
        const dataTable = new DataTable(tableElement as HTMLTableElement, {
          searchable: true,
          fixedHeight: true,
          perPage: 5,
        });

        return () => {
          dataTable.destroy();
        };
      }, 0); // Delay initialization for the next tick

      return () => clearTimeout(timeoutId);
    }
  }, []);

  const handleButtonClick = (salesOrder: any) => {
    const FORM_FILL_VALUES = {
      sender: {
        name: "The Blue Man",
        address: "5, Alipure, Nimta, Kolkata",
        zipCode: "700049",
        city: "Kolkata",
        country: "India",
        email: "ceo@theblueman.in",
        phone: "8583944249",
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
        items: salesOrder?.orderItems?.map((product: any) => {
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
    reset(FORM_FILL_VALUES);
  };

  return (
    <table id="filter-table">
      <thead>
        <tr>
          <th>
            <span className="flex items-center">
              Code
              <svg
                className="w-4 h-4 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m8 15 4 4 4-4m0-6-4-4-4 4"
                />
              </svg>
            </span>
          </th>
          <th>
            <span className="flex items-center">
              Name
              <svg
                className="w-4 h-4 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m8 15 4 4 4-4m0-6-4-4-4 4"
                />
              </svg>
            </span>
          </th>
          <th>
            <span className="flex items-center">
              Phone
              <svg
                className="w-4 h-4 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m8 15 4 4 4-4m0-6-4-4-4 4"
                />
              </svg>
            </span>
          </th>
          <th>
            <span className="flex items-center">
              Email
              <svg
                className="w-4 h-4 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m8 15 4 4 4-4m0-6-4-4-4 4"
                />
              </svg>
            </span>
          </th>
          <th>
            <span className="flex items-center">
              Status
              <svg
                className="w-4 h-4 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m8 15 4 4 4-4m0-6-4-4-4 4"
                />
              </svg>
            </span>
          </th>
          <th>
            <span className="flex items-center">
              Items
              <svg
                className="w-4 h-4 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m8 15 4 4 4-4m0-6-4-4-4 4"
                />
              </svg>
            </span>
          </th>
          <th>
            <span className="flex items-center">
              Created At
              <svg
                className="w-4 h-4 ms-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m8 15 4 4 4-4m0-6-4-4-4 4"
                />
              </svg>
            </span>
          </th>
          <th>
            <span className="flex items-center">Action</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.map((order: any) => (
          <tr key={order._id}>
            <td>{order.orderCode}</td>
            <td>{order.customer.name}</td>
            <td>{order.customer.contactNumber}</td>
            <td>{order.customer.email}</td>
            <td>{order.orderStatus}</td>
            <td>
              {order.orderItems.map((item: any, index: number) => (
                <div key={index}>
                  <strong>{item.item.name}</strong> (Qty: {item.quantity}, Rate:{" "}
                  {item.rate}, Total: {item.totalPrice})
                </div>
              ))}
            </td>
            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            <td>
              <BaseButton
                size="icon"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent event from bubbling up to row
                  handleButtonClick(order);
                }}
              >
                <ScrollText className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <ScrollText className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Make Invoice</span>
              </BaseButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
