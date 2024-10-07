// Components
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Demo } from "@/types";
import { SalesOrderService } from "@/services/SalesOrderService";
import Cookies from "js-cookie";
import OrderTable from "@/components/ui/datatable";
import { Card, CardTitle } from "@/components/ui/card";
import { InvoiceMain } from "@/app/components";

export default function Home() {
  const [salesOrders, setSalesOrders] = useState<Demo.SalesOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState<any>(null);

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
  }, []);

  const getSalesOrders = (data: any[]) => {
    return [...(data || [])].map((d, index) => {
      d.date = new Date(d.createdAt);
      d.index = index + 1;
      return d;
    });
  };

  return (
    <main className="py-10 lg:container gap-5">
      <div className="pb-10">
        <Card className="px-5 py-2 gap-5">
          <CardTitle className="flex items-center gap-3 my-5">
            <span className="uppercase">Sales Orders</span>
          </CardTitle>
          {salesOrders?.length > 0 && <OrderTable data={salesOrders} />}
        </Card>
      </div>
      <InvoiceMain />
    </main>
  );
}
