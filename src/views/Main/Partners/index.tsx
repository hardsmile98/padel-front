import { Container } from "@/src/components";
import Image from "next/image";
import partner1 from "@/src/assets/images/partners/1.svg";
import partner2 from "@/src/assets/images/partners/2.webp";
import partner3 from "@/src/assets/images/partners/3.webp";
import partner4 from "@/src/assets/images/partners/4.svg";
import partner5 from "@/src/assets/images/partners/5.svg";
import partner6 from "@/src/assets/images/partners/6.webp";
import styles from "./styles.module.css";

function Partners() {
  return (
    <section className={styles.partners}>
      <Container>
        <div className={styles.wrapper}>
          <h1>Партнеры</h1>

          <div className={styles.partnersList}>
            <div className={styles.partner}>
              <Image loading="lazy" src={partner1} alt="Финансист" />
            </div>

            <div className={styles.partner}>
              <Image loading="lazy" src={partner2} alt="0 Mitra" />
            </div>

            <div className={styles.partner}>
              <Image loading="lazy" src={partner3} alt="Липтсофт" />
            </div>

            <div className={styles.partner}>
              <Image loading="lazy" src={partner4} alt="ФПР" />
            </div>

            <div className={styles.partner}>
              <Image loading="lazy" src={partner5} alt="Padel club" />
            </div>

            <div className={styles.partner}>
              <Image loading="lazy" src={partner6} alt="POL" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Partners;
