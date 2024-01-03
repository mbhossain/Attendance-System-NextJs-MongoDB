import connectMongoDB from "@/libs/mongodb";
import Employee from "@/models/employee";
import { NextResponse } from "next/server";
import url from 'url';

export async function POST(request) {
  const { name, mobile, email, blood_group, status, fileName } = await request.json();
  await connectMongoDB();
  await Employee.create({ name, mobile, email, blood_group, status, fileName });
  return NextResponse.json({ message: "Employee Created" }, { status: 201 });
}

export async function GET(req) {
  try {
    await connectMongoDB();
    const parsedUrl = url.parse(req.url, true);
    const page = parsedUrl.query?.page_no ? parseInt(parsedUrl.query.page_no) : 1;
    const limit = parsedUrl.query?.limit ? parseInt(parsedUrl.query.limit) : 10;
    const skip = (page - 1) * limit;
    const total = await Employee.countDocuments();

    const employees = await Employee.find()
      .skip(skip)
      .limit(limit);

    let res = {
      result: {
        data: employees,
        page_no: page,
        limit: limit,
        total: total
      },
      status: 'OK'
    };

    return NextResponse.json(res);
  } catch (error) {
    let res = {
      message: error,
      status: 'NOK'
    };
    return NextResponse.json(res);
  }
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Employee.findByIdAndDelete(id);
  return NextResponse.json({ message: "Employee deleted" }, { status: 200 });
}