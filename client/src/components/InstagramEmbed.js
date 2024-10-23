import { React, useEffect } from 'react'


export default function InstagramEmbed() {

    useEffect(() => {
        // Load Instagram's embed script
        const script = document.createElement('script');
        script.src = '//www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);
    
        // Cleanup: remove the script when the component unmounts
        return () => {
          document.body.removeChild(script);
        };
      }, []);
    
      return (
        <blockquote
          className="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/spatialucsb/?utm_source=ig_embed&utm_campaign=loading"
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px',
            maxWidth: '540px',
            minWidth: '326px',
            padding: 0,
            width: '99.375%',
          }}
        >
          
        </blockquote>
    )
}





