export const getFact = async () => {
  const response = await fetch("https://catfact.ninja/fact");
  return response.json();
}