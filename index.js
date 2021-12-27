//create the interact button
$(function () {
    const send_button = '<button id="send_button">LOG CUSTOMER CALL</button>';
    $("body").append(send_button);

//parse the URL to exact just the customer ID value
    $("body").on("click", '#send_button', function () {
        let current_url = window.location.href;
        let customer_id = "";
        let current_url_parts = current_url.split("CustomerID=");
        if (current_url_parts[1]) {
            let current_url_parts2 = current_url_parts[1].split("#");
            customer_id = current_url_parts2[0];
        }
        send_webhook(customer_id);
        return false;
    });

});

//trigger webhook and inject headers to be parse in Power Automate. append custid
function send_webhook(customer_id) {
    let url = "webhook_URL_HERE";
    $.ajax({
        url: url,
        type: "GET",
        headers: {
            "Connection": "close",
            "Accept": "*/*",
            "Accept-Encoding": "br,gzip,deflate",
            "Accept-Language": "en-US,en; q=0.9",
            "Host": "prod-190.westus.logic.azure.com",
            "Referer": "SOURCE_URL",
            "User-Agent": "Mozilla/5.0,(Macintosh; Intel Mac OS X 10_15_7),AppleWebKit/537.36,(KHTML, like Gecko),Chrome/96.0.4664.55,Safari/537.36,Edg/96.0.1054.43",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Microsoft Edge\";v=\"96\"",
            "dnt": "1",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "origin": "SOURCE_URL",
            "sec-fetch-site": "cross-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "Content-Length": "0",
            "custid": customer_id
        },
        success: function (response) {
            //alert(JSON.stringify(response));
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //alert("Error status:" + xhr.status + "\n" + "Error message:" + thrownError);
        }
    });
}
