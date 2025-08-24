import { Container } from "@/src/components";
import env from "@/src/env";
import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";
import buttonIcon from "@/src/assets/images/button-icon.svg";

function GoToLanding() {
  return (
    <section className={styles.landingLink}>
      <Container>
        <div className={styles.wrapper}>
          <Link href={env.LANDING_URL || ""} className={styles.link}>
            Основной сайт лиги
            <span>
              <Image width={22} height={22} src={buttonIcon} alt="icon" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default GoToLanding;
