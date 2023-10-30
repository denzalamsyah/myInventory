import Head from "next/head";

export default function MetaHead(props) {
  return (
    <Head>
      <title>{props.title} - WIT Inventory</title>
      <meta name="description" content={props.description} />
    </Head>
  );
}
