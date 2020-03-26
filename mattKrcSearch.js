    $( document ).ready(function() {
    var GET = {};
    var query = window.location.search.substring(1).split("&");
    var pageid = undefined;
    for (var i = 0, max = query.length; i < max; i++)
    {
        if (query[i] === "") // check for trailing & with no param
            continue;

        var param = query[i].split("=");
        GET[decodeURIComponent(param[0])] = decodeURIComponent(param[1] || "");
        if (decodeURIComponent(param[0]) === 'pageid') {
        var pageid = Number(decodeURIComponent(param[1] || "")) - 1;
        }
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function noTranscriptions(data, index) {
    return data[index].transcriptions.length === 0
    }

    function displayThumbs(data, type) {
        $('.prevpage').hide();
        $('.nextpage').hide();
        var start = 1;
        var content = $('#var-content');
        var transcriptions = type === 'search' ? data : data.transcriptions
        var ul = $('<ul />');
        var maxPerPage = transcriptions.length;
        maxPerPage = transcriptions.length < maxPerPage ? data.transcriptions.length : maxPerPage;
        content.empty();
        $('#count').html("Transcribed pages " + start + "-" + maxPerPage);
        for (var i=0;i<maxPerPage;i++) {
        var item = transcriptions[i];
        var thumbnail = item.img.replace("https://publications.newberry.org/transcription/mms-transcribe/files/original/","https://publications.newberry.org/transcription/mms-transcribe/files/square_thumbnails/");
        var maxChars = 520;
        var text = item.text;
        var itemtitle = "";
        if (type === 'search') {
            $('.thumbheader').hide();
            text = cutText(item.text, maxChars, item.search);
            itemtitle = $('<a />', {
            href: item.item_url,
            css: {
                "margin-top":"20px"
            }
            }).html(item.item);
            
        } else {
            text = cutText(item.text, maxChars);
            itemtitle = null;
        }
        var imglink = $('<a />', {
            href:item.url.replace("http","https")
        });
        $('<img />', {src: thumbnail, width: '20%'}).appendTo(imglink);
        $('<span>Transcribe this page</span>').appendTo(imglink);
        var textspan = $('<span />', {
            class: "cuttext"
        }).html(text);
        var li = $('<li />');
        li.append(imglink);
        li.append(itemtitle);
        li.append(textspan);
        li.appendTo(ul);
        }
        content.append(ul);
    }
    function cutText(text, maxchars, search) {
        var shownText = "";
        var hiddenFront = "";
        var hiddenBack = "";
        var newText = "";
        if (search === undefined) {
        if (text.length > maxchars) {
            shownText = text.substr(0, maxchars);
            hiddenBack = text.slice(maxchars, text.length);
            newText = shownText + "<span style='display:none;' class='hiddentext'>" + hiddenBack + "</span><span class='ellip less back'>[...]</span>";
        } else {
            newText = text;
        }
        } else {
        var re = new RegExp(search, 'gi');
        var searchIndex = text.toLowerCase().indexOf(search.toLowerCase());
        var sideLength = maxchars / 2;
        if (text.length < maxchars) {
            newText = text;
        } else if (searchIndex > sideLength && text.length - searchIndex > sideLength) {
            shownText = text.substr(searchIndex - sideLength, maxchars);
            hiddenFront = text.substr(0, searchIndex - sideLength);
            hiddenBack = text.slice(shownText.length + hiddenFront.length, text.length);
            newText = "<span class='ellip front less'>[...]</span><span class='hiddenfront' style='display:none;'>" + hiddenFront + "</span>" + shownText + "<span class='hiddenback' style='display:none;'>" + hiddenBack + "</span><span class='ellip back less'>[...]</span>";
        } else if (searchIndex < sideLength && text.length - searchIndex > sideLength) {
            shownText = text.slice(0, searchIndex);
            shownText = shownText + text.substr(searchIndex, sideLength);
            hiddenText = text.slice(searchIndex + sideLength, text.length);
            newText = shownText + "<span style='display:none;' class='hiddentext'>" + hiddenText + "</span><span class='ellip back less'>[...]</span>";
        } else {
            shownText = text.substr(searchIndex - sideLength, sideLength);
            shownText = shownText + text.slice(searchIndex, text.length);
            hiddenFront = text.substr(0,searchIndex - sideLength);
            newText = "<span class='ellip front less'>[...]</span><span class='hiddentext'>" + hiddenFront + "</span>" + shownText;
        }
        newText = newText.replace(re, '<em class="highlight">$&</em>');
        }
        return newText;
    }
    function displayFullSize(data, index, tIndex, type) {
        var item = type === "browse" ? data[index] : {"item":data[index].item,"item_url":data[index].item_url, "transcriptions": data};
        var content = $('#var-content');
        var pagenum = tIndex + 1;
        var itemnum = index + 1;
        var transcription = item.transcriptions[tIndex];
        var headerText = $("<h2 />", {
        text: item.item
        });
        var header = $("<a />", {
        href: item.item_url.replace("http","https"),
        target: '_self'
        });
        var viewAll = $('<span />', {
        text: 'View all pages'
        })
        header.append(headerText);
        header.append(viewAll);
        var imglink = $("<a />", {
        class: "imglink",
        href: transcription.url.replace("http","https")
        });
        var img = $("<img />", {
        src: transcription.img,
        id: "itemimg"
        });
        img.appendTo(imglink);
        $('<span>Transcribe this page</span>').appendTo(imglink);
        var maxchars = 1200;
        var text = transcription.text;
        if (type === "search") {
        text = cutText(text,maxchars,item.transcriptions[tIndex].search)
        } else {
        text = cutText(text, maxchars);
        }
        transcription = $('<span />', {
        html: text,
        class: "transcription",
        css: {
            float: "right"
        }
        })
        content.append(imglink);
        content.append(transcription);
        $('.thumbheader').empty();
        $('.thumbheader').append(header);
        $('.thumbheader').append('<div class="page_manuscripts"><button class="previtem"><</button><span>Manuscript </span><span class="itemnum">' + itemnum + '</span><span> of ' + data.length + '</span><button class="nextitem">></button></div>');
        $('#count').html('<span id="pagenum">' + pagenum + '</span> of <span id="pagetotal">' + item.transcriptions.length + '</span> transcribed pages');
        if (pagenum === item.transcriptions.length) {
        $('.nextpage').hide();
        } else {
        $('.nextpage').show();
        };
        if (pagenum === 1) {
        $('.prevpage').hide();
        } else {
        $('.prevpage').show();
        }
    };
    function displaySearchResults(r, i, re) {
            $('#var-content').empty();
            var item_url = r[i].iurl.replace("http","https");
            var item_title = r[i].item;
            var transcription_img = r[i].img;
            var transcription_txt = r[i].text;
            transcription_txt = transcription_txt.replace(re,'<em class="highlight">$&</em>');
            var result_number = i + 1;
            var item_header_link = $('<a href="' + item_url + '" ><h2>' + item_title + '</h2><span>View all pages</span></a>');
            var results_length = r.length;
            var count = $('<span>' + result_number + " of " + results_length + " pages found</span>" );
            $('#count').html(count);
            $('.thumbheader').html(item_header_link);
            var imglink = $('<a class="imglink" href="' + r[i].url.replace("http","https") + '"></a>');
            $('<img />', {src: transcription_img}).appendTo(imglink);
            $('#var-content').append(imglink);
            $('<span style="float:right;" class="transcription">' + transcription_txt + '</span>').appendTo($('#var-content'));
            if (result_number === results_length) {
            $('.nextresult').hide();
            } else {
            $('.nextresult').show();
            }
            if (result_number === 1) {
            $('.prevresult').hide();
            } else {
            $('.prevresult').show();
            }
    }
    $.getJSON( "https://publications.newberry.org/transcription/mms-transcribe/data/alltranscripts.json").done(function(data) {
        var content = $('#var-content');
        var search = "";
        var index = "";
        var results = [];
        var randNum = getRandom(0,data.length);
        var startIndex = pageid === undefined || pageid > data.length ? randNum : pageid;
        var startTranscriptionIndex = 0;
        while (data[startIndex].transcriptions.length === 0) {
            startIndex++;
        }
        displayFullSize(data, startIndex, 0, "browse");
        
        function establishSearch() {
            content.removeClass('browse');
            content.addClass('searchresults');
            $('.thumbheader div').hide();
            $('#pagebuttons').hide();
            $('#resultbuttons').show();
        }
        
        function performSearch() {
            establishSearch();
            $('#resultbuttons').remove();
            $('<div id="resultbuttons" style="display:inline; float:right; text-transform:uppercase;font-size:16px;"><button class="prevresult"><</button>Result <span class="itemnum"></span> of <span class="totalresults"></span><button class="nextresult">></button></div>').appendTo('.thumbheader');
            search = $('#search').val();
            index = 0;
            results = [];
            for (var i = 0; i < data.length; i++) {
                var transcriptions = data[i]["transcriptions"];
                for (var j = 0; j < transcriptions.length; j++) {
                    var text = transcriptions[j]["text"].toLowerCase();
                    if (text.includes(search.toLowerCase())) {
                    transcriptions[j].item = data[i]["item"];
                    transcriptions[j].item_url = data[i]["item_url"].replace("http","https");
                    transcriptions[j].search = search;
                    results.push(transcriptions[j]);
                    }
                }
            }
            if (results.length === 0) {
                alert("No results found for " + search);
            } else if ($('#var-content').hasClass('thumbnails')) {
                displayThumbs(results, 'search');
            } else {
                newPage(results, 0, 0, "search");
            }

            $('.itemnum').text("1")
            $('.totalresults').text(results.length)
        }
        
        function establishBrowse() {
            content.removeClass('searchresults');
            if (!content.hasClass('browse')) {
            content.addClass('browse');
            }
            $('#pagebuttons').show();
            $('.thumbheader').show();
            $('#resultbuttons').hide();
            $('#resultcount').hide();
            startIndex = getRandom(0,data.length);
            startTranscriptionIndex = 0;
            while (noTranscriptions(data,startIndex)) {
            startIndex++;
            }
            displayFullSize(data, startIndex, startTranscriptionIndex, "browse");
        }
        
        function newPage(data, index, tIndex, type="browse") {
            var maxchars = 1200;
            var total = "";
            var newImg = "";
            var newText = "";
            var newItemUrl = "";
            var newHeader = "";
            var pageNum = "";
            var itemNum = "";
            if (type === 'search') {
            total = data.length;
            newImg = data[index].img;
            newImgLink = data[index].url.replace("http","https");
            newItemUrl = data[index].item_url;
            newText = cutText(data[index].text, maxchars, data[index].search);
            newHeader = data[index].item;
            pageNum = index + 1;
            $('.itemnum').html(pageNum);
            if (index === 0) {
                $('.prevresult').hide();
            } else {
                $('.prevresult').show();
            }
            if (index + 1 === total) {
                $('.nextresult').hide()
            } else {
                $('.nextresult').show()
            }
            } else {
            total = data[index].transcriptions.length;
            newImg = data[index].transcriptions[tIndex].img;
            newImgLink = data[index].transcriptions[tIndex].url.replace("http", "https");
            newItemUrl = data[index].item_url.replace("http","https");
            newText = cutText(data[index].transcriptions[tIndex].text, maxchars);
            newHeader = data[index].item;
            pageNum = tIndex + 1;
            itemNum = index + 1;
            $('.itemnum').html(itemNum);
            if (tIndex + 1 === total) {
                $('.nextpage').hide();
            } else {
                $('.nextpage').show();
            }
            if (tIndex === 0) {
                $('.prevpage').hide();
            } else {
                $('.prevpage').show();
            }
            if (index + 1 === data.length) {
                $('.nextitem').hide();
            } else {
                $('.nextitem').show();
            }
            if (index === 0) {
                $('.previtem').hide();
            } else {
                $('.previtem').show();
            }
            }
            
            if (newHeader != $('.thumbheader').text()) {
            $('.thumbheader a').html('<h2 class="heading_font heading_weight clearboth">' + newHeader + '</h2>');
            $('.thumbheader a').append('<span>View all pages</span>');
            $('.thumbheader a').attr('href',newItemUrl);
            }
            $('#itemimg').attr('src',newImg);
            $('.imglink').attr('href',newImgLink);
            $('.transcription').html(newText);
            $('#pagenum').html(pageNum);
            $('#pagetotal').html(total);
        }
        
        $('.nextpage').click(function() {
            startTranscriptionIndex++;
            newPage(data, startIndex, startTranscriptionIndex);
        });
        
        $('.prevpage').click(function() {
            startTranscriptionIndex--;
            newPage(data, startIndex, startTranscriptionIndex);
        });
        
        $('.nextitem').click(function() {
            startIndex++;
            startTranscriptionIndex = 0;
            while (data[startIndex].transcriptions.length === 0) {
            startIndex++;
            }
            if (content.hasClass('fullsize')) {
            newPage(data, startIndex, 0);
            } else {
            displayThumbs(data[startIndex], "browse");
            $('.thumbheader a').text(data[startIndex].item);
            $('.itemnum').text(startIndex + 1);
            }
        });
        
        $('.previtem').click(function() {
            startIndex--;
            startTranscriptionIndex = 0;
            while (data[startIndex].transcriptions.length === 0) {
            startIndex--;
            }
            if (content.hasClass('fullsize')) {
            newPage(data, startIndex, 0);
            } else {
            displayThumbs(data[startIndex], "browse");
            $('.thumbheader a').text(data[startIndex].item);
            $('.itemnum').text(startIndex + 1);
            }
        });

        $('#thumbs').click(function(e) {
            if (content.hasClass("browse")) {
            displayThumbs(data[startIndex], "browse");
            } else {
            displayThumbs(results, "search");
            }
            content.removeClass("fullsize");
            content.addClass("thumbnails");
            e.preventDefault();
        });
        
        $('#fullsize').click(function(e) {
            if (!content.hasClass('fullsize')) {
            content.empty();
            content.removeClass('thumbnails');
            content.addClass('fullsize');
            var currentView = content.hasClass("browse") ? "browse" : "search";
            if (currentView === "browse") {
                displayFullSize(data, startIndex, startTranscriptionIndex, currentView);
            } else {
                displayFullSize(results, 0, 0, currentView);
            }
            }
            e.preventDefault();
        });
        
        $('#browse').click(function(e) {
            content.empty();
            establishBrowse();
            e.preventDefault();
        });
        
        
        $('#input_button').click(function(e) {
            performSearch();
            e.preventDefault();
        });
        
        $(document).on('keypress',function(e) {
            if(e.which == 13) {
            performSearch();
            e.preventDefault();
            }
        });
        
        $('body').on('click', '.nextresult', function() {
            index++;
            newPage(results, index, 0, "search");
        });
        $('body').on('click', '.prevresult', function() {
            index--;
            newPage(results, index, 0, "search");
        });
        })
        $('body').on('click', '.ellip', function() {
            if ($(this).hasClass('less')) {
                $(this).removeClass('less');
                $(this).html('[ - ]');
            } else {
                $(this).addClass('less');
                $(this).html('[...]');
            }
            if ($(this).hasClass('back')) {
                $(this).prev().toggle();
            } else {
                $(this).next().toggle();
            }
            return false;
        })
    });