/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBlue: "#F0F6FC",
        heroSubText: "#6D7C94",
        btnBlue: "#1E61DC",
        btnText: "#E8F4FF",
        cardLightBlue: "#E7F6FF",
        textBlack: "#2E2E32",
        line: "#A4B1C1",
        cardBgWhite: "#F0F0F0",
      },
      fontFamily: {
        BRFirma: ["BRFirma-Black"],
        BRFirmaBold: ["BRFirma-Bold"],
        BRFirmaMedium: ["BRFirma-Medium"],
        BRFirmaRegular: ["BRFirma-Regular"],
        PoppinsRegular: ["Poppins-Regular"],
      },
    },
  },
  plugins: [],
};
