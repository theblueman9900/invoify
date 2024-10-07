import React, { ReactNode } from 'react';
import {
  AppBreadcrumbProps,
  BreadcrumbItem,
  MenuProps,
  MenuModel,
  LayoutConfig,
  LayoutState,
  Breadcrumb,
  LayoutContextProps,
  AppConfigProps,
  AppTopbarRef,
  AppMenuItemProps,
  AppMenuItem,
} from './layout';
import { Demo, LayoutType, SortOrderType, CustomEvent, ChartDataState, ChartOptionsState, AppMailSidebarItem, AppMailReplyProps, AppMailProps } from './demo';

// Zod
import z from 'zod';

// RHF
import { FieldPath, UseFormReturn } from 'react-hook-form';

// Zod schemas
import { InvoiceSchema, ItemSchema } from '@/lib/schemas';

type ChildContainerProps = {
  children: ReactNode;
};

// Form types
type InvoiceType = z.infer<typeof InvoiceSchema>;
type ItemType = z.infer<typeof ItemSchema>;
type FormType = UseFormReturn<InvoiceType>;
type NameType = FieldPath<InvoiceType>;
type CurrencyType = {
  [currencyCode: string]: string;
};

// Signature types
type SignatureColor = {
  name: string;
  label: string;
  color: string;
};

type SignatureFont = {
  name: string;
  variable: string;
};

// Wizard types
type WizardStepType = {
  id: number;
  label: string;
  isValid?: boolean;
};

// Export types
export enum ExportTypes {
  JSON = 'JSON',
  CSV = 'CSV',
  XML = 'XML',
  XLSX = 'XLSX',
  DOCX = 'DOCX',
}

export enum SignatureTabs {
  DRAW = 'draw',
  TYPE = 'type',
  UPLOAD = 'upload',
}
export type {
  AppBreadcrumbProps,
  Breadcrumb,
  BreadcrumbItem,
  MenuProps,
  MenuModel,
  LayoutConfig,
  LayoutState,
  LayoutContextProps,
  AppConfigProps,
  AppTopbarRef,
  AppMenuItemProps,
  ChildContainerProps,
  Demo,
  LayoutType,
  SortOrderType,
  CustomEvent,
  ChartDataState,
  ChartOptionsState,
  AppMailSidebarItem,
  AppMailReplyProps,
  AppMailProps,
  AppMenuItem,
  InvoiceType,
  ItemType,
  FormType,
  NameType,
  CurrencyType,
  SignatureColor,
  SignatureFont,
  WizardStepType,
};
