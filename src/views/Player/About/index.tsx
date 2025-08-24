/* eslint-disable @next/next/no-img-element */
import { Container } from '@/src/components';
import { GetPlayerBySlugResponse } from '@/src/types'
import styles from './styles.module.css';
import Image from 'next/image';
import logo from '@/src/assets/images/logo.svg';
import defaultPlayer from '@/src/assets/images/player-placeholder.svg';
import buttonIcon from '@/src/assets/images/button-icon.svg';
import wreath from '@/src/assets/images/wreath.svg';
import Link from 'next/link';
import env from '@/src/env';
import backgroundBlur from '@/src/assets/images/player-bg.webp';
import backgroundGo from '@/src/assets/images/player-go.svg';

const About = ({ player }: { player: GetPlayerBySlugResponse['player'] }) => {
  
  const formattedDescription = player.description.filter((item: string) => item.trim() !== '');

  return (
    <section 
      id="about"
      className={styles.about}
    >
      <Image
        className={styles.backgroundBlur}
        width={1920}
        height={1080}
        src={backgroundBlur}
        alt="background"
      />

      <Image 
        className={styles.backgroundGo}
        width={1015}
        height={520}
        src={backgroundGo}
        alt="background"
      />

      <Container>
        <div className={styles.playerWrapper}>
          <div className={styles.logo}>
            <Image
              width={147} 
              height={14} 
              src={logo} 
              alt="GoPadel League"
            />
          </div>

          <div className={styles.content}>
            <div className={styles.playerInfo}>
              <h1>{player.firstName} {player.lastName}</h1>

              <p>Участник сезона GoPadel League</p>
            </div>

            {player.photoUrl ? (
                <img
                  className={styles.playerPhoto}
                  src={player.photoUrl}
                  alt={player.firstName} 
                />
              ): (
                <Image
                  className={styles.defaultPlayer}
                  width={1070} 
                  height={840} 
                  src={defaultPlayer} 
                  alt="Player"
                />
              )}

            <div className={styles.description}>
              <div>
                {player.raiting && (
                  <div className={styles.rating}>
                    <Image
                      width={76}
                      height={63}
                      src={wreath}
                      alt="wreath"
                    />

                    <span>
                      {player.raiting}
                    </span>
                  </div>
                )}

                {Array.isArray(formattedDescription) && formattedDescription.length > 0 && (
                  <ul>
                    {formattedDescription.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                   </ul>
                  )}
                </div>

                {env.LANDING_URL && (
                  <div className={styles.buttonWrapper}>
                    <Link 
                      className={styles.buttonLink}
                      href={env.LANDING_URL}>
                      Записаться в лигу

                    <span>       
                      <Image
                        width={22}
                        height={22}
                        src={buttonIcon}
                        alt="icon"
                      />
                    </span>
                    </Link>
                  </div>
                )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About;