import styles from "./Menu.module.scss";
import { Image, Icon, Input } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { Platforms } from "@/api";
import { map } from "lodash";
import Link from "next/link";

const platformsCtrl = new Platforms();

export function Menu(props) {
    const { isOpenSearch } = props;
    const [platforms, setPlatforms] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await platformsCtrl.getAll();
                setPlatforms(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className={styles.platforms}>
            {map(platforms, (platform) => (
                <Link
                    key={platform.id}
                    href={`/games/${platform.attributes.slug}`}
                >
                    <Image src={platform.attributes.icon.data.attributes.url} />
                    {platform.attributes.title}
                </Link>
            ))}
        </div>
    );
}
