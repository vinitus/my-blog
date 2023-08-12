export default async function Data2() {
  const res = await fetch('https://dcb7a8e3-965b-4d6a-8a40-ff96b332a2fc.mock.pstmn.io/hello');

  const jsonData = await res.json();

  const { a } = jsonData;

  return <div>{a}</div>;
}
