"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRef } from 'react';

interface DeleteEmployeeProps {
    id: string;
    onDelete: () => Promise<void>;
}

export default function DeleteEmployee({ id, onDelete }: DeleteEmployeeProps) {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDialogElement>(null)

    const removeTopic = async () => {
        setIsModalOpen(true);
        setTimeout(() => {
            if (modalRef.current) {
                modalRef.current?.showModal();
            }
        }, 100);

    };

    const confirmDelete = async () => {
        const res = await fetch(`http://localhost:3000/api/employee?id=${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            setIsModalOpen(false);
            onDelete();
            router.refresh();
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <button onClick={removeTopic} className="btn btn-error btn-xs">delete</button>

            {isModalOpen && (
                <dialog ref={modalRef} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div className="text-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                                stroke="red"
                                className="text-red-500 w-12 h-12 mx-auto"
                            >
                                <circle cx="10" cy="10" r="8" strokeWidth="2" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6v2M10 14h.01" />
                            </svg>
                        </div>
                        <p className="py-4 text-center">Are you sure want to delete?</p>
                        <div className="flex justify-center">
                            <button onClick={confirmDelete} className="btn btn-success btn-xs mx-2">Yes</button>
                            <button onClick={closeModal} className="btn btn-error btn-xs">No</button>
                        </div>
                    </div>
                </dialog>
            )}
        </>
    );
}
