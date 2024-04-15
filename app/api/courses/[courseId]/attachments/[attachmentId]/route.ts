import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function DELETE(
    req: Request,
    { params }: { params: { courseId: string, attachmentId: string}},
) {
    try {
        const { userId } = auth(); 

        if (!userId){
            return new NextResponse("Unauthorised", { status: 401 });
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,  
            },
        })

        if (!courseOwner) {
            return new NextResponse("Unauthorised", { status: 401 });
        }
        
        const attachment = await db.attachment.delete({
            where: {
                id: params.attachmentId,
            },
        })
          
        return NextResponse.json(attachment);
    } catch (error) {
        console.log("ATTACHMENT_ID", error);
        return new NextResponse("Internal error", { status: 500 });  
    } 
}
