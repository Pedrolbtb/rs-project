import { errorToJSON } from "next/dist/server/render";

export async function POST() {
    try {
        console.log('entrou')
      const clientId = '5d083833efaea3d487cf189a201e861db29d8d3a';
      const clientSecret = 'eae0e6b53ff8fd8169046d4f53a406c51a5d044dd45110fe4b172f33b38bbe87b3c9cea542f296332701ee43c491884ab30170b6c532ef5c779857b51794eb58d89a40472d4a449170b1fe98467705d2c9b6af932c6afccdf106f243fcebaadaf322a3e57113037e69585e2aeed972e34ecb6d75e2f6243d811cd2dd08b1a3b46b83ff50cafc41c210452a8b49cf05138bd32f2acf80ad86a2bbd9663184244240a40113363f9dbff6e3049e833fa04ce41ded6b6d0f1ef823a97be081a5a61b0e95832d26dc3b518c6c552a93747ec6b172992778f5400798f6233d7d0cbdbada5ed545fd97e3ef04c23685c63b19901f1ec4cb5610a7c290172be26bc0fe7f';
  
      const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
      const response = await fetch('https://integration.plataformaserv.com.br/v1/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${basicAuth}`,
        },
        body: new URLSearchParams({ grant_type: 'client_credentials' }),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        const errorJason = await response.json();
        console.log(errorJason)
        throw new Error(`Erro no servidor: ${response.status} - ${errorText}`);
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { status: 200 });
  
    } catch (error) {
        console.log(error.response)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });

    }
  }