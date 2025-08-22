import { Container } from "@/src/components"
import styles from './styles.module.css';

const NotFound = () => {
  return (
    <Container>
      <div className={styles.root}>
        <h1>404</h1>

        <p>Страница не найдена</p>
      </div>
    </Container>
  )
}

export default NotFound