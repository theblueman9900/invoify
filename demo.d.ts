
/* Chart.js Types */
import { ChartData, ChartOptions } from 'chart.js';

type InventoryStatus = 'INSTOCK' | 'LOWSTOCK' | 'OUTOFSTOCK';

type Status = 'DELIVERED' | 'PENDING' | 'RETURNED' | 'CANCELLED';

export type LayoutType = 'list' | 'grid';
export type SortOrderType = 1 | 0 | -1;

export interface CustomEvent {
  name?: string;
  status?: 'Ordered' | 'Processing' | 'Shipped' | 'Delivered';
  date?: string;
  color?: string;
  icon?: string;
  image?: string;
}

interface ShowOptions {
  severity?: string;
  content?: string;
  summary?: string;
  detail?: string;
  life?: number;
}

export interface ChartDataState {
  barData?: ChartData;
  pieData?: ChartData;
  lineData?: ChartData;
  polarData?: ChartData;
  radarData?: ChartData;
}
export interface ChartOptionsState {
  barOptions?: ChartOptions;
  pieOptions?: ChartOptions;
  lineOptions?: ChartOptions;
  polarOptions?: ChartOptions;
  radarOptions?: ChartOptions;
}

export interface AppMailProps {
  mails: Demo.Mail[];
}

export interface AppMailSidebarItem {
  label: string;
  icon: string;
  to?: string;
  badge?: number;
  badgeValue?: number;
}

export interface AppMailReplyProps {
  content: Demo.Mail | null;
  hide: () => void;
}

declare namespace Demo {
  interface Task {
    id?: number;
    name?: string;
    description?: string;
    completed?: boolean;
    status?: string;
    comments?: string;
    attachments?: string;
    members?: Member[];
    startDate?: string;
    endDate?: string;
  }

  interface Member {
    name: string;
    image: string;
  }

  interface DialogConfig {
    visible: boolean;
    header: string;
    newTask: boolean;
  }

  interface Mail {
    id: number;
    from: string;
    to: string;
    email: string;
    image: string;
    title: string;
    message: string;
    date: string;
    important: boolean;
    starred: boolean;
    trash: boolean;
    spam: boolean;
    archived: boolean;
    sent: boolean;
  }

  interface Message {
    text: string;
    ownerId: number;
    createdAt: number;
  }

  //ProductService
  type Product = {
    _id?: string;
    code?: string;
    name: string;
    description: string;
    image?: string;
    price?: number;
    category?: string;
    group?: string | Group;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    rating?: number;
    orders?: ProductOrder[];
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  //ItemModel
  type Item = {
    _id?: string;
    code?: string;
    name: string;
    description?: string;
    image?: string;
    price?: number;
    category?: string;
    unitOfMeasure?: string;
    group?: string | Group;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    rating?: number;
    orders?: ProductOrder[];
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  //RecipeModel
  type Recipe = {
    _id?: string;
    recipeTitle: string;
    recipeDescription: string;
    finishedItem?: Item | string;
    ingredientList?: Ingredient[];
    labourCost?: number = 0;
    factoryOverHeadCost?: number = 0;
    createdBy?: string | User;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  //IngredientModel
  type Ingredient = {
    _id?: string;
    itemName?: string;
    item?: Item | string;
    quantity?: number | null;
    status?: string;
    totalQunatity?: number;
    totalValue?: number;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  //IngredientModel
  type SupplyItem = {
    _id?: string;
    vendorItem?: string;
    item?: Item | string;
    vendor?: Vendor | string;
    price?: number | null;
    idDefault?: boolean;
    itemNamw?: string;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  //InventoryItemModel
  type InventoryItem = {
    _id?: string;
    itemName?: string;
    item?: Item | string;
    quantity?: number | null;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  //InventoryModel
  type Inventory = {
    _id?: string;
    departmentItem: string;
    item: Item | string;
    department: Department | string;
    quantity?: number = 0;
    quantityOnHold?: number = 0;
    quantityOnTrack?: number = 0;
    createdBy?: string | User;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type InventoryByItem = {
    _id?: string;
    itemName?: string;
    departments?: DepartmentEntry[];
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type DepartmentEntry = {
    _id?: string;
    department?: string;
    entry: Inventory;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type InventoryByDepartment = {
    _id?: string;
    department?: string;
    items?: ItemEntry[];
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type PayrollByMonth = {
    _id?: string;
    month?: string;
    items?: Payroll[];
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type ItemEntry = {
    _id?: string;
    itemName?: string;
    entry: Inventory;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };
  //InventoryModel
  type BulkInventory = {
    _id?: string;
    department: Department | string;
    ingredientList?: InventoryItem[];
    createdBy?: string | User;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type ProductOrder = {
    id?: string;
    productCode?: string;
    date?: string;
    amount?: number;
    quantity?: number;
    customer?: string;
    status?: Status;
  };

  type OrderItem = {
    _id?: string;
    itemName?: string;
    item?: string | Item;
    quantity?: number | null;
    rate?: number;
    name?: string;
    totalPrice?: number;
    status?: string;
    totalValue?: number;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type ProcessItem = {
    _id?: string;
    itemName?: string;
    item?: string | Item;
    quantity?: number | null;
    rate?: number;
    totalPrice?: number;
    name?: string;
    status?: string;
    totalValue?: number;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };
  type InternalOrder = {
    _id?: string;
    orderCode?: string;
    requestorDepartment?: string | Department;
    donorDepartment?: string | Department;
    orderItems?: OrderItem[];
    orderStatus?: string;
    reason?: string;
    createdBy?: string | User;
    updatedAt?: string;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type PurchaseOrder = {
    _id?: string;
    orderCode?: string;
    vendor?: string | Vendor;
    requestorDepartment?: string | Department;
    orderItems?: OrderItem[];
    orderStatus?: string;
    reason?: string;
    createdBy?: string | User;
    updatedAt?: string;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type SalesOrder = {
    _id?: string;
    orderCode?: string;
    customer?: string | Customer;
    donorDepartment?: string | Department;
    orderItems?: OrderItem[];
    orderStatus?: string;
    reason?: string;
    createdBy?: string | User;
    updatedAt?: string;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  type Process = {
    _id?: string;
    processCode?: string;
    processingDepartment?: string | Department;
    processItems?: ProcessItem[];
    processStatus?: string;
    reason?: string;
    order?: string | SalesOrder | PurchaseOrder | InternalOrder;
    createdBy?: string | User;
    updatedAt?: string;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };
  type Payment = {
    name: string;
    amount: number;
    paid: boolean;
    date: string;
  };

  //CustomerService
  type Customer = {
    _id?: string;
    name?: string;
    email?: string;
    contactNumber?: string;
    contactPersonName?: string;
    address?: string;
    country?: string;
    state?: string;
    pincode?: string;
    bank_account_no?: string;
    bank_ifsc_code?: string;
    bank_account_name?: string;
    pan_document?: string;
    profilePicture?: string;
    signature?: string;
    avatar?: string;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  };

  //UserService
  interface User {
    name?: string;
    image?: string;
    status?: string;
    messages?: Message[];
    lastSeen?: string;

    _id?: string;
    employeeCode?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    hash_password?: string;
    password?: string;
    contactNumber?: string;
    jobTitle?: string;
    dateOfJoining?: Date;
    primaryManager?: User;
    secondaryManager?: User;
    allowedLeaves?: string;
    salary?: number;
    workHours?: string;
    paySchedule?: string;
    dob?: Date;
    sex?: string;
    address?: string;
    country?: string;
    state?: string;
    pincode?: string;
    bank_account_no?: string;
    bank_ifsc_code?: string;
    bank_account_name?: string;
    adhaar_document?: string;
    pan_document?: string;
    voter_document?: string;
    admit_card_document?: string;
    highest_degree_certificate_document?: string;
    profilePicture?: string;
    username?: string;
    role?: string;
    emergencyContactNumber?: string;
    emergencyContactName?: string;
    emergencyContactaddress?: string;
    signature?: string;
    avatar?: string;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  }

  interface Payroll {
    _id?: string;
    employeeId?: string | User;
    month?: string;
    baseSalary?: number;
    totalWorkHours?: number;
    totalDaysPresent?: number;
    totalDaysAbsent?: number;
    totalLeaveDays?: number;
    overtimeHours?: number;
    overtimePay?: number;
    totalPay?: number;
    deductions?: number;
    netPay?: number;
    status?: string;
    paidOn?: Date;
    [key: string]: string | string[] | number | boolean | undefined | User[] | Message[] | Date;
  }

  interface Attendance {
    employee?: string | User;
    date?: Date;
    clockIn?: string | Date;
    clockOut?: string | Date;
    dateString?: string;
    clockInString?: string;
    clockOutString?: string;
    totalHoursWorked?: number;
    status?: string;
    _id?: string;
    [key: string]: string | string[] | number | boolean | undefined | User[] | Message[] | Date;
  }

  interface Regularization {
    _id?: string;
    requestor?: string | User;
    attendance?: {
      employee?: string | User;
      date?: Date;
      clockIn?: Date;
      clockOut?: Date;
      dateString?: string;
      clockInString?: string;
      clockOutString?: string;
      totalHoursWorked?: number;
      status?: string;
      [key: string]: string | string[] | number | boolean | undefined | User[] | Message[] | Date;
    };
    reason?: string;
    status?: string;
    reviewedBy?: string | User;
    reviewDate?: Date;
    updatedAt?: Date;
    [key: string]: string | string[] | number | boolean | undefined | User[] | Message[] | Date;
  }

  interface Leave {
    _id?: string;
    requestor?: string | User;
    attendance?: {
      employee?: string | User;
      date?: Date;
      clockIn?: Date;
      clockOut?: Date;
      dateString?: string;
      clockInString?: string;
      clockOutString?: string;
      totalHoursWorked?: number;
      status?: string;
      [key: string]: string | string[] | number | boolean | undefined | User[] | Message[] | Date;
    };
    reason?: string;
    status?: string;
    reviewedBy?: string | User;
    reviewDate?: Date;
    updatedAt?: Date;
    [key: string]: string | string[] | number | boolean | undefined | User[] | Message[] | Date;
  }

  interface Vendor {
    _id?: string;
    name?: string;
    email?: string;
    contactNumber?: string;
    contactPersonName?: string;
    address?: string;
    country?: string;
    state?: string;
    pincode?: string;
    bank_account_no?: string;
    bank_ifsc_code?: string;
    bank_account_name?: string;
    pan_document?: string;
    profilePicture?: string;
    signature?: string;
    avatar?: string;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  }

  //DepartmentService
  interface Department {
    _id?: string;
    name: string;
    slug: string;
    image: string;
    parentId: string;
    incharge?: string;
    parentDepartment?: Department;
    isDefaultIntake?: boolean;
    isDefaultOutlet?: boolean;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date;
  }

  //GroupService
  interface Group {
    _id?: string;
    key?: string;
    data?: Group;
    createdAt?: Date;
    updatedAt?: Date;
    date?: Date;
    name: string;
    slug: string;
    parentId: string | Group | undefined;
    parentGroup?: Group;
    children?: Group[];
    department?: string | Department;
    [key: string]: string | string[] | number | boolean | undefined | Message[] | Date | Group;
  }

  interface Event extends EventInput {
    location?: string;
    description?: string;
    tag?: {
      name: string;
      color: string;
    };
  }

  // PhotoService
  type Photo = {
    title: string;
    itemImageSrc?: string | undefined;
    thumbnailImageSrc?: string | undefined;
    alt?: string | undefined;
  };

  type Country = {
    name: string;
    code: string;
  };

  type EmailRequest = {
    from: string;
    to: string;
    subject: string;
    message: string;
  };

  // IconService
  type Icon = {
    icon?: {
      paths?: string[];
      attrs?: [{}];
      isMulticolor?: boolean;
      isMulticolor2?: boolean;
      grid?: number;
      tags?: string[];
    };
    attrs?: [{}];
    properties?: {
      order?: number;
      id: number;
      name: string;
      prevSize?: number;
      code?: number;
    };
    setIdx?: number;
    setId?: number;
    iconIdx?: number;
  };
}
