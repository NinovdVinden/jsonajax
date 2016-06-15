$(document).ready(function(){
    var zoekWoord;
    //roept functie Imghalen aan doormiddel van klikken
    $('#haalOp').click(function() {
        zoekWoord = $('#zoekwoord').val();
        imgHalen();
    });
    //roept functie Imghalen aan doormiddel van enter
    $('#zoekwoord').keydown(function(e) {
        if(e.keyCode == 13){
            zoekWoord = $(this).val();
            imgHalen();
        }
    });

    //haalt img uit de api
    function imgHalen() {
        var linkFlickr = "http://api.flickr.com/services/feeds/photos_public.gne?format=json&tags="+
        zoekWoord + "&jsoncallback=?"
        $.ajax (
            {
                dataType: 'json',
                method: 'GET',
                url: linkFlickr,
                success: fotosVerwerken
            }

        )
    }

    //verwerkt data van foto's en output die
    function fotosVerwerken(data) {
        console.log(data);
        $('#images').html("");
        for(var i=0; i<data.items.length; i++){
            var image = data.items[i];
            var codehtml = "<div class='holder'><div class='image'><a href='" + image.link + "' target='_blank'><img src='" + image.media.m + "' alt='" + image.title + "' ></a></div><h4>" + image.title + "</h4></div>";


            $('#images').append(codehtml);
        }
        $('#source a').attr("href", data.link).text(data.title + "")

    }
})
