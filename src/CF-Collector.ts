// 

const DefaultChannels = "nim_vpn_ir,hope_net,vpn_ioss,proxystore11,outline_vpn"

async function fetchAndDecodeBase64(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return new Response("Error: Unable to fetch the URL", { status: 400 });
    }

    const text = await response.text();

    const decodedText = atob(text);

    return decodedText;
  } catch (error) {
    return new Response("Error: " + error.message, { status: 500 });
  }
}

async function extractCodeText(decodedText) {
  const codeTextRegex = /<code>(.*?)<\/code>/g;

  const matches = Array.from(decodedText.matchAll(codeTextRegex));

  if (matches.length === 0) {
    return new Response("Error: Config not found in the response", { status: 404 });
  }

  let allCodeText = '';
  for (const match of matches) {
    const codeText = match[1];
    allCodeText += codeText + '\n';
  }

  const lines = allCodeText.split('\n');

  const lastSixLines = lines.slice(-6).join('\n');
  
  return lastSixLines;
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  try {
    const url = new URL(request.url);
    const channelName = url.searchParams.get('chname');
    const b64Param = url.searchParams.get('b64');

    if (!channelName && !b64Param) {
      const channelNames = DefaultChannels.split(',');
      let allCodeText = '';

      for (const name of channelNames) {
        const urlFetch = "https://rwinserver.000webhostapp.com/?chname=" + encodeURIComponent(name);
        const decodedText = await fetchAndDecodeBase64(urlFetch);
        const codeText = await extractCodeText(decodedText);
        allCodeText += codeText + '\n';
      }

      return new Response(allCodeText, {
        headers: {
          "Content-Type": "text/plain",
        },
      });

    } else if (channelName && b64Param === "ok") {
      const channelNames = channelName.split(',');
      let allCodeText = '';

      for (const name of channelNames) {
        const urlFetch = "https://rwinserver.000webhostapp.com/?chname=" + encodeURIComponent(name);
        const decodedText = await fetchAndDecodeBase64(urlFetch);
        const codeText = await extractCodeText(decodedText);
        allCodeText += codeText + '\n';
      }

      return new Response(btoa(allCodeText), {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } else if (channelName && !b64Param) {
      const channelNames = channelName.split(',');
      let allCodeText = '';

      for (const name of channelNames) {
        const urlFetch = "https://rwinserver.000webhostapp.com/?chname=" + encodeURIComponent(name);
        const decodedText = await fetchAndDecodeBase64(urlFetch);
        const codeText = await extractCodeText(decodedText);
        allCodeText += codeText + '\n';
      }

      return new Response(allCodeText, {
        headers: {
          "Content-Type": "text/plain",
        },
      });
    } else if (!channelName && b64Param === "ok") {
      const channelNames = DefaultChannels.split(',');
      let allCodeText = '';

      for (const name of channelNames) {
        const urlFetch = "https://rwinserver.000webhostapp.com/?chname=" + encodeURIComponent(name);
        const decodedText = await fetchAndDecodeBase64(urlFetch);
        const codeText = await extractCodeText(decodedText);
        allCodeText += codeText + '\n';
      }

      return new Response(btoa(allCodeText), {
        headers: {
          "Content-Type": "text/plain",
        },
      });

    }
  } catch (error) {
    return new Response("Error: " + error.message, { status: 500 });
  }
}
