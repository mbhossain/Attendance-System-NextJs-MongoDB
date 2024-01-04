import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name, mobile, email, blood_group, status, fileName } = await request.json();
  await connectMongoDB();
  await Employee.findByIdAndUpdate(id, { name, mobile, email, blood_group, status, fileName });
  return NextResponse.json({ message: "Employee updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const employee = await Employee.findOne({ _id: id });
  return NextResponse.json({ employee }, { status: 200 });
}
