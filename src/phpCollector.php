<?php


if (isset($_GET['chname'])) {
    $chnames = explode(',', $_GET['chname']); // Split 'chname' parameter into an array using comma as a separator
    $responses = array();

    foreach ($chnames as $chname) {
        $url = 'https://t.me/s/' . trim($chname); // Assuming the chname is a valid URL

        // Make a request and get the response
        $response = @file_get_contents($url);

        if ($response !== false) {
            // Store the response in the array
            $responses[] = $response;
        } else {
            // If there was an error making the request, you can handle it as you need
            // For now, let's store an error message in the array
            $responses[] = "Error: Unable to fetch data from $url";
        }
    }

    // Join the responses obtained from all the URLs and separate them with a delimiter (e.g., "<br>")
    $joinedResponse = implode("<br>", $responses);

    // Encode the joined response data in Base64 before returning it
    $encodedResponse = base64_encode($joinedResponse);

    // Perform other stuff with the $encodedResponse as needed

    echo $encodedResponse;
} else {
    // If 'chname' parameter is not provided in the URL
    echo "Error: 'chname' parameter missing in the URL.";
}
?>
