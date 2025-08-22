import styles from './styles.module.css';


const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.root}>
      {children}
    </div>
  )
}

export default Container