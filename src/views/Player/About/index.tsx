/* eslint-disable @next/next/no-img-element */
import { Container } from '@/src/components';
import { GetPlayerBySlugResponse } from '@/src/types'
import styles from './styles.module.css';
import Image from 'next/image';
import logo from '@/src/assets/images/logo.svg';
import defaultPlayer from '@/src/assets/images/player-placeholder.svg';
import Link from 'next/link';
import env from '@/src/env';

const About = ({ data }: { data: GetPlayerBySlugResponse }) => {

  const { player } = data;

  return (
    <section 
      id="about"
      className={styles.about}
    >
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

          <div>
            <div>
              <h1>{player.firstName} {player.lastName}</h1>

              <p>Участник сезона GoPadel League</p>
            </div>

            {player.photoUrl ? (
                <img
                 src={player.photoUrl}
                 alt={player.firstName} 
                />
              ): (
                <Image
                  width={1070} 
                  height={840} 
                  src={defaultPlayer} 
                  alt="Player"
                />
              )}

            <div>
                <div>
                {player.raiting && (
                    <div>
                    {player.raiting}
                    </div>
                )}

                {player.description && (
                    <ul>
                        {player.description.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
                </div>

                {env.LANDING_URL && (
                    <Link href={env.LANDING_URL}>
                        Записаться в лигу
                    </Link>
                )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default About;