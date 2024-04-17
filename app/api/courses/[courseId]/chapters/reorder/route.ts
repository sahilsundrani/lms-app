import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const { userId } = auth();    

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { list } = await req.json();

    const ownCourse = await db.course.findUnique({
      where: {
        userId,
        id: params.courseId,
      },
    })

    if (!ownCourse) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    for (let item of list) {
        await db.chapter.update({
            where: { id: item.id },
            data: { position: item.position }
        });
    } 

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.error('[REORDER]', error)
    return new NextResponse('Internal server error', { status: 500 });
  }
}