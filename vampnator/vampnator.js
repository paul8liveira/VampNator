var active = true;

try {
    chrome.storage.sync.get({
        activate: true
    }, function (items) {
        active = items.activate;
        if (active) {
            main();
        }
    });
} catch (e) {
    if (active) {
        main();
    }
}

function main() {
    (function ($) {

        var self = {
            vampNatorImgs: [
				'https://lh5.ggpht.com/-NjADQUyCEd4/U58sE2ripdI/AAAAAAAAI8s/aK_llycn-yo/w506-h353/Ronaldo+Vampeta+Sheik.gif',
				'https://i.makeagif.com/media/10-09-2015/Dm8u2j.gif',
				'http://f.i.uol.com.br/folha/publicidade/images/14088309.jpeg',
				'https://conteudo.imguol.com.br/2012/09/25/vampeta-fala-sobre-ensaio-nu-para-a-g-magazine-1348607286095_956x500.jpg',
				'https://www.gazetaesportiva.com/wp-content/uploads/imagem/2016/04/24/00863849-1024x681.jpg',
				'https://e.i.uol.com.br/futebol/090129vampeta_acusado208.jpg',
				'http://cdn.foxsports.com.br/sites/foxsports-br/files/img/notes/materia/620x465/vampeta-640x480-fotoarena.jpg',
				'https://img.r7.com/images/2014/06/25/35uegnu4hd_i494wnd8_file.jpg?dimensions=460x305',
				'https://abrilexame.files.wordpress.com/2016/09/size_960_16_9_vampeta.jpg?quality=70&strip=info',
				'http://www.socurticao.net/portal/images/noticias/1255/vampeta_marcos6.jpg',
				'https://www.gazetaesportiva.com/wp-content/uploads/imagem/2016/04/15/00054006-1024x683.jpg',
				'http://cenaslamentaveis.com.br/wp-content/uploads/2017/03/vampeta2-400x300.jpg',
				'http://images.performgroup.com/di/library/Goal_France/8/f3/vampeta-psg_12dontpb7wbz51eynlisl3nciq.jpg?t=931643162&w=620&h=430',           
            ],

			//obtem todas as imagens da pagina
            handleImages: function (lstImgs, time) {
                $.each($('img'), function (i, item) {
					//pula se imagem doa vamp ja foi carregada
                    if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                        var h = $(item).height();
                        var w = $(item).width();

                        //imagem realmente carregada
                        if (h > 0 && w > 0) {
                            self.handleImg(item, lstImgs);
                        }
                        else {
                            //modifica imagem depois de carregada
                            $(item).load(function () {
                                //prevencao de loop infinito
                                if ($.inArray($(item).attr('src'), lstImgs) == -1) {
                                    self.handleImg(item, lstImgs);
                                }
                            });
                        }
                    }
                });

                //mantem o script trocando de imagem
                if (time > 0) {
                    setTimeout(function () { self.handleImages(lstImgs, time); }, time);
                }
            },
            //Replace one image
            handleImg: function (item, lstImgs) {
                $(item).error(function () {
                    //trata erro 
                    self.handleBrokenImg(item, lstImgs);
                });

                self.setRandomImg(item, lstImgs);
            },
			//seta imagem randomicamente
            setRandomImg: function (item, lstImgs) {
                var h = $(item).height();
                var w = $(item).width();
                $(item).css('width', w + 'px').css('height', h + 'px');
                $(item).attr('src', lstImgs[Math.floor(Math.random() * lstImgs.length)]);
            },
			//remove imagem do vamp da lista, pode ser que a url nao exista mais 
            handleBrokenImg: function (item, lstImgs) {

                var brokenImg = $(item).attr('src');
                var index = lstImgs.indexOf(brokenImg);
                if (index > -1) {
                    lstImgs.splice(index, 1);
                }
                self.setRandomImg(item, lstImgs);
            },
        };

        //executa troca de imagens
        $(function () {

            self.handleImages(self.vampNatorImgs, 3000);

        });

    })(jQuery);
}