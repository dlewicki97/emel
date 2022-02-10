export default function validateNIP(nip) {
  const errorMessage = "Nip jest nieprawidłowy!";
  if (!nip) return true;
  nip = nip.toString().replace(/\D/g, "");
  if (nip.length != 10) return errorMessage;

  for (let i = 0; i < 10; i++) if (isNaN(nip[i])) return errorMessage;

  let sum =
    6 * nip[0] +
    5 * nip[1] +
    7 * nip[2] +
    2 * nip[3] +
    3 * nip[4] +
    4 * nip[5] +
    5 * nip[6] +
    6 * nip[7] +
    7 * nip[8];
  sum %= 11;
  if (nip[9] != sum || sum == 10) return errorMessage;

  return true;
}
