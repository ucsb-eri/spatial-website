import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        h1: {
            fontFamily: ['"Nunito Sans"', 'sans-serif'].join(','),
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
            fontSize: '2.6rem',
            '@media (max-width:600px)': {
            fontSize: '2.25rem', // Font size for small screens
            },
            '@media (max-width:400px)': {
                fontSize: '2rem', // Font size for medium screens
            },
        },
        h2: {
            fontFamily: ['"Nunito Sans"', 'sans-serif'].join(','),
            fontSize: '2.5rem',
            '@media (max-width:750px)': {
            fontSize: '2rem', // Font size for small screens
            },
            '@media (max-width:600px)': {
            fontSize: '1.75rem', // Font size for small screens
            },
            '@media (max-width:400px)': {
                fontSize: '1.5rem', // Font size for medium screens
            },
        },
        h3: {
            fontFamily: ['"Nunito Sans"', 'sans-serif'].join(','),
            fontSize: '2rem',
            '@media (max-width:750px)': {
                fontSize: '1.75rem', // Font size for small screens
            },
            '@media (max-width:500px)': {
                fontSize: '1.6rem', // Font size for small screens
            },
            '@media (max-width:400px)': {
                fontSize: '1.3rem', // Font size for small screens
            },

        },
        h4: {
            fontFamily: ['"Nunito Sans"', 'sans-serif'].join(','),
            fontSize: '1.75rem',
            '@media (max-width:750px)': {
                fontSize: '1.5rem', // Font size for small screens
            },
            '@media (max-width:500px)': {
                fontSize: '1.25rem', // Font size for small screens
            },
            '@media (max-width:400px)': {
                fontSize: '1.15rem', // Font size for small screens
            },
        },
        h5: {
            fontFamily: ['"Nunito Sans"', 'sans-serif'].join(','),
            fontSize: '1.25rem',
            textTransform: 'none',
            '@media (max-width:750px)': {
                fontSize: '1.15rem', // Font size for small screens
            },
            '@media (max-width:500px)': {
                fontSize: '1rem', // Font size for small screens
            },
            '@media (max-width:400px)': {
                fontSize: '1rem', // Font size for small screens
            },
            
        },
        h6: {
            fontFamily: ['"Nunito Sans"', 'sans-serif'].join(','),
            fontSize: '1.1rem',
            textTransform: 'none',
            '@media (max-width:750px)': {
                fontSize: '1rem', // Font size for small screens
            },
            '@media (max-width:500px)': {
                fontSize: '0.9rem', // Font size for small screens
            },
            '@media (max-width:400px)': {
                fontSize: '0.8rem', // Font size for small screens
            },
        },
        caption: {
            fontFamily: ['"Nunito Sans"', 'sans-serif'].join(','),
            fontSize: '1rem',
            '@media (max-width:750px)': {
                fontSize: '0.9rem', // Font size for small screens
            },
            '@media (max-width:500px)': {
                fontSize: '0.8rem', // Font size for small screens
            },
            '@media (max-width:400px)': {
                fontSize: '0.7rem', // Font size for small screens
            },
        }

    }
})