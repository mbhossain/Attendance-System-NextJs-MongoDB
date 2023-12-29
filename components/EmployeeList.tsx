import Link from "next/link";

interface User {
  _id: number;
  name: string;
  email: string;
  mobile: string;
  blood_group: string;
  status: string;
}

const getTopics = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/employee", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export default async function TopicsList() {
  const users: User[] = await getTopics();
  console.log('users:', users)
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-md font-bold">Employee List</h4>
        <Link href="/features/user-create" className="btn btn-primary btn-sm">Create</Link>
      </div>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>SL No</th>
            <th>Image</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Blood Group</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => <tr key={user._id}>
            <td>{index + 1}</td>
            <td></td>
            <td>{user.name}</td>
            <td>{user.mobile}</td>
            <td>{user.email}</td>
            <td>{user.blood_group}</td>
            <td>{user.status}</td>
            <td></td>
          </tr>)}
        </tbody>
      </table>
    </>
  );
}
