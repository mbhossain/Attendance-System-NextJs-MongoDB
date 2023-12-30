"use client";
import { useRouter } from "next/navigation";

interface UserID {
    id: string;
}

export default function DeleteEmployee({ id }: UserID) {
    const router = useRouter();
    const removeTopic = async () => {
        const confirmed = confirm("Are you sure?");

        if (confirmed) {
            const res = await fetch(`http://localhost:3000/api/employee?id=${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            }
        }
    };

    return (
        <button onClick={removeTopic} className="btn btn-error btn-xs">delete</button>
    );
}
