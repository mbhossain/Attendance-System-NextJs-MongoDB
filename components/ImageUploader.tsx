"use client";
import axios from "axios";
import React, { FormEvent, useRef, useState } from "react";
import Image from "next/image";

interface FileNameProps {
    fileName: (f?: string) => Promise<void>;
}

const ImageUploader = ({ fileName }: FileNameProps) => {
    // 1. add reference to input element
    const ref = useRef<HTMLInputElement>(null);
    const [urls, setUrls] = useState<string[]>([]);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 2. get reference to the input element
        const input = ref.current!;

        // 3. build form data
        const formData = new FormData();
        const files = Array.from(input.files ?? []);
        for (const file of files) {
            formData.append(file.name, file);
            fileName(file.name);
        }


        // 4. use axios to send the FormData
        await axios.post("/api/upload", formData);
        setUrls(files.map((file) => `/api/uploads/${file.name}`));
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="mt-5 ml-10">
                <input className="file-input file-input-bordered file-input-info w-full max-w-xs file-input-md" type="file" name="files" accept="image/*" ref={ref} multiple />
                <button type="submit" className="ml-3 btn btn-info btn-sm">Upload</button>
            </form>
            {/* display uploaded images */}
            {urls.length > 0 && (
                <div className="relative aspect-video max-h-[100px] mt-3 ml-10">
                    {urls.map((url) => {
                        return (
                            <Image
                                key={url}
                                src={url}
                                alt={url}
                                className="object-cover"
                                fill
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default ImageUploader;
