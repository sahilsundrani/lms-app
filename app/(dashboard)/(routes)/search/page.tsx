import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { getCourses } from "@/actions/get-courses";
import { CoursesList } from "@/components/courses-list"; 

import { Categories } from "./_components/categories";
import { MobileSearch } from "./_components/mobile-search";
import { redirect } from "next/navigation";

interface SearchPageProps {
    searchParams: { 
        title: string;
        categoryId: string
    }
};

const SearchPage = async ({
    searchParams,
}: SearchPageProps) => {
    const { userId } = auth();
     
    if (!userId) {
        return redirect("/");
    }

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc",
        },
    })

    const courses = await getCourses({
        userId,
        ...searchParams, 
    });
    
    return (
        <>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
            <MobileSearch />
        </div>
        <div className="p-6 space-y-4">
            <Categories
                items={categories} 
            />
            <CoursesList
                items={courses}
             />
        </div>
        </>
    );
}
 
export default SearchPage;