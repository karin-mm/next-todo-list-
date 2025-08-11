// import { TodoProvider } from '@/context/tododata';
// import type { AppProps } from 'next/app';

// export default function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <TodoProvider>
//       <Component {...pageProps} />
//     </TodoProvider>
//   );
// }




import type { AppProps } from "next/app";
import { TodoProvider } from "@/context/tododata";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "@/assets/theme/components/palette";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TodoProvider>
        <Component {...pageProps} />
      </TodoProvider>
    </ThemeProvider>
  );
}
