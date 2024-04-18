"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";  

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
 
interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
};

export const Actions = ({
    disabled,
    courseId,
    isPublished,
}: ActionsProps) => {
    const router = useRouter();
    const confetti = useConfettiStore(); 
    const [isLoading, setIsloading] = useState(false);

    const onClick = async () => {
        try {
            setIsloading(true);

            if (isPublished) {
                await axios.patch(`/api/courses/${courseId}/unpublish`);
                toast.success("Course unpublished"); 
                router.refresh(); 
                router.push(`/teacher/courses/${courseId}`);
            } else {
                await axios.patch(`/api/courses/${courseId}/publish`);
                toast.success("Course published");
                confetti.onOpen(); 
            }

            router.refresh(); 
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsloading(false);
        } 
    }

    const onDelete = async () => {
        try {
            setIsloading(true);

            await axios.delete(`/api/courses/${courseId}`);

            toast.success("Course deleted");
            router.refresh();
            router.push(`/teacher/courses`);  
        } catch (error) {
            toast.error("Something went wrong"); 
        } finally {
            setIsloading(false);
        }
    }

    useEffect(() => {
        router.refresh();
    }, []);

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onClick}
                disabled={disabled || isLoading}
                variant="outline"
                size="sm" 
            >  
                {isPublished ? "Unpublish" : "Publish"} 
            </Button>
            <ConfirmModal onConfirm={onDelete}>  
                <Button disabled={isLoading}  size="sm">
                    <Trash className="h-4 w-4"/>
                </Button>
            </ConfirmModal>
        </div>
    )
}