export const getAge = async (name: string) => {
  const response = await fetch(`https://api.agify.io/?name=${encodeURIComponent(name)}`);
  return response.json();
}