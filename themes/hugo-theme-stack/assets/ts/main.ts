/*!
*   Hugo Theme Stack
*
*   @author: Jimmy Cai
*   @website: https://jimmycai.com
*   @link: https://github.com/CaiJimmy/hugo-theme-stack
*/

import { createGallery } from "./gallery"
import { getColor } from './color';
import menu from './menu';

let Stack = {
    init: () => {
        /**
         * Bind menu event
         */
        menu();

        if (document.querySelector('.article-content')) {
            createGallery('.article-content');
        }

        /**
         * Add color to tags
         */
        document.querySelectorAll('.color-tag').forEach(async (tag: HTMLLinkElement) => {
            const imageURL = tag.getAttribute('data-image'),
                key = tag.getAttribute('data-key'),
                hash = tag.getAttribute('data-hash');

            const colors = await getColor(key, hash, imageURL);

            tag.style.color = colors.Vibrant.bodyTextColor;
            tag.style.background = colors.Vibrant.hex;
        })

        /**
         * Add linear gradient background to tile style article
         */
        const articleTile = document.querySelector('.article-list--tile');
        if (articleTile) {
            let observer = new IntersectionObserver(async (entries, observer) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;
                    observer.unobserve(entry.target);

                    const articles = entry.target.querySelectorAll('article.has-image');
                    articles.forEach(async articles => {
                        const image = articles.querySelector('img'),
                            imageURL = image.src,
                            key = image.getAttribute('data-key'),
                            hash = image.getAttribute('data-hash'),
                            articleDetails: HTMLDivElement = articles.querySelector('.article-details');

                        const colors = await getColor(key, hash, imageURL);


                    })
                })
            });

            observer.observe(articleTile)
        }
    }
}

window.addEventListener('load', () => {
    setTimeout(function () {
        Stack.init();
    }, 0);
})

window.Stack = Stack;