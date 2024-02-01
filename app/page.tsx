import { Button } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Link href='/issue'>
                <Button>Create Issue</Button>
            </Link>
        </div>
    );
}
