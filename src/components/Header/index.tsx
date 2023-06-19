import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";

export function Header(){
    return (
        <header className={styles.header}> 
            <div className={styles.headerContent}>
                <Image src="/assets/logo.svg" alt="Ig.News Logo" width={100} height={50} />
                <nav>
                    <Link href='' className={styles.active}>Home</Link>
                    <Link href='' >Posts</Link>
                </nav>
            </div>
        </header>
    )
}