/**
 * Everest Story Content and Reader Functions
 */

// Story content organized by parts - Simplified to single story section
const storyContent = {
    1: {
        title: "लेखिका परिचय",
        content: `
            <h3>बछेंद्री पाल (1954)</h3>
            <p>बछेंद्री पाल का जन्म उत्तरांचल के चमोली जिले में बम्पा गाँव में चौबीस मई उन्नीस सौ चौवन को हुआ। बछेंद्री अपनी माँ हंसादेई नेगी और पिता किशन सिंह पाल की तीसरी संतान हैं। पिता पढ़ाई का <span class="highlight-vocab">खर्च<div class="vocab-tooltip">व्यय</div></span> उठाने में असमर्थ थे; अतः बछेंद्री को आठवीं के आगे की पढ़ाई का खर्च सिलाई-कढ़ाई करके जुटाना पड़ा।</p>
            
            <p>दसवीं पास करने के बाद बछेंद्री के प्रिंसिपल ने उनके पिता को उनकी आगे की पढ़ाई के लिए सहमत किया। बछेंद्री ने ऐसी विषम स्थितियों के बावजूद संस्कृत से एम.ए. और फिर बी.एड. की शिक्षा हासिल की। लक्ष्य के प्रति इसी <span class="highlight-vocab">समर्पण<div class="vocab-tooltip">पूर्ण निष्ठा</div></span> भाव ने इन्हें एवरेस्ट पर विजय पाने वाली पहली भारतीय पर्वतारोही होने का गौरव दिलाया।</p>
            
            <p>बछेंद्री को पहाड़ों पर चढ़ने का चाव बचपन से ही था। जब इनका बड़ा भाई इन्हें पहाड़ पर चढ़ने से रोकता था और इनसे छह साल छोटे भाई को पहाड़ पर चढ़ने के लिए उकसाता था, तब बछेंद्री को बहुत बुरा लगता था। वह सोचती थी कि भाई यह क्यों नहीं समझता कि जो काम छोटा भाई कर सकता है, वह उसकी यह बहन भी कर सकती है।</p>`
    },
    2: {
        title: "कहानी",
        content: `
            <h3>एवरेस्ट : मेरी शिखर यात्रा</h3>
            
            <p>एवरेस्ट <span class="highlight-vocab">अभियान<div class="vocab-tooltip">किसी काम के लिए प्रतिबद्धता</div></span> दल सात मार्च को दिल्ली से काठमांडू के लिए हवाई जहाज़ से चल दिया। एक मजबूत अग्रिम दल पहले ही चला गया था जिससे कि वह हमारे 'बेस कैंप' पहुँचने से पहले <span class="highlight-vocab">दुर्गम<div class="vocab-tooltip">जहाँ पहुँचना कठिन हो</div></span> हिमपात के रास्ते को साफ़ कर सके।</p>
            
            <p>नमचे बाज़ार, शेरपालैंड का एक सर्वाधिक महत्त्वपूर्ण क्षेत्र है। अधिकांश शेरपा इसी स्थान तथा यहीं के आसपास के गाँवों के होते हैं। यह नमचे बाज़ार ही था, जहाँ से मैंने सर्वप्रथम एवरेस्ट को निहारा, जो नेपालियों में 'सागरमाथा' के नाम से प्रसिद्ध है। मुझे यह नाम अच्छा लगा।</p>
            
            <p>एवरेस्ट की तरफ़ गैर से देखते हुए, मैंने एक भारी बर्फ़ का बड़ा फूल (प्लूम) देखा, जो पर्वत-शिखर पर लहराता एक ध्वज-सा लग रहा था। मुझे बताया गया कि यह दृश्य शिखर की ऊपरी सतह के आसपास डेढ़ सौ किलोमीटर अथवा इससे भी अधिक की गति से हवा चलने के कारण बनता था, क्योंकि तेज़ हवा से सूखा बर्फ़ पर्वत पर उड़ता रहता था। बर्फ़ का यह ध्वज दस किलोमीटर या इससे भी लंबा हो सकता था। शिखर पर जानेवाले व्यक्ति को दक्षिण-पूर्वी पहाड़ी पर इन तूफ़ानों को झेलना पड़ता था, विशेषकर ख़राब मौसम में। यह मुझे डराने के लिए काफ़ी था, फिर भी मैं एवरेस्ट के प्रति खिंची हुई थी और इसकी कठिनतम चुनौतियों का सामना करना चाहती थी।</p>
            
            <p>जब हम छब्बीस मार्च को पहुँचे, हमें हिम-स्खलन के कारण हुई एक शेरपा कुली की मृत्यु का दुखद समाचार मिला। खुंबू हिमपात पर जानेवाले अभियान-दल के रास्ते के बाईं तरफ़ सीधी पहाड़ी के धसकने से, ल्होत्से की ओर से एक बहुत बड़ी बर्फ़ की चट्टान नीचे खसक आई थी। सोलह शेरपा कुलियों के दल में से एक की मृत्यु हो गई और चार घायल हो गए थे।</p>
            
            <p>इस समाचार के कारण अभियान दल के सदस्यों के चेहरों पर छाए अवसाद को देखकर हमारे नेता कर्नल खुल्लर ने स्पष्ट किया कि एवरेस्ट जैसे महान अभियान में खतरों को और कभी-कभी तो मृत्यु को भी आदमी को सहज भाव से स्वीकार करनी चाहिए।</p>
            
            <p>उपनेता प्रेमचंद, जो अग्रिम दल का नेतृत्व कर रहे थे, छब्बीस मार्च को पैरिक हाइट आए। उन्होंने हमारी पहली बड़ी बाधा खुंबू हिमपात की स्थिति से हमें अवगत कराया। उन्होंने कहा कि उनके दल ने कैंप-एक (छह हज़ार मीटर) जो हिमपात के ठीक ऊपर है, वहाँ तक का रास्ता साफ़ कर दिया है। उन्होंने यह भी बताया कि पुल बनाकर, रस्सियाँ बाँधकर तथा झंडियों से रास्ता चिह्नित कर, सभी बड़ी कठिनाइयों का जायज़ा ले लिया गया है। उन्होंने यह भी ध्यान दिलाया कि ग्लेशियर बर्फ़ की नदी है और बर्फ़ का गिरना अभी जारी है। हिमपात में अनियमित और अनिश्चित बदलाव के कारण अभी तक के किए गए सभी काम व्यर्थ हो सकते हैं और हमें रास्ता खोलने का काम दोबारा करना पड़ सकता है।</p>
            
            <p>'बेस कैंप' में पहुँचने से पहले हमें एक और मृत्यु की ख़बर मिली। जलवायु अनुकूल न होने के कारण एक रसोई सहायक की मृत्यु हो गई थी। निश्चित रूप से हम आशाजनक स्थिति में नहीं चल रहे थे।</p>
            
            <p>एवरेस्ट शिखर को मैंने पहले दो बार देखा था, लेकिन एक दूरी से बेस कैंप पहुँचने पर दूसरे दिन मैंने एवरेस्ट पर्वत तथा इसकी अन्य श्रेणियों को देखा। मैं भौंचक्की होकर खड़ी रह गई और एवरेस्ट, ल्होत्से और नुप्से की ऊँचाइयों से घिरी, बर्फ़ीली टेढ़ी-मेढ़ी नदी को निहारती रही।</p>
            
            <p>हिमपात अपने-आप में एक तरह से बर्फ़ के खंडों के अव्यवस्थित ढंग से गिरना ही था। हमें बताया गया कि ग्लेशियर के बहने से अक्सर बर्फ़ में हलचल हो जाती थी, जिससे बड़ी-बड़ी बर्फ़ की चट्टानें तत्काल गिर जाया करती थीं और अन्य कारणों से भी अचानक प्रायः ख़तरनाक स्थिति धारण कर लेती थीं। सीधे धरातल पर दरार पड़ने का विचार और इस दरार का गहरे-चौड़े हिम-विदर में बदल जाने का मात्र ख़याल ही बहुत डरावना था। इससे भी ज़्यादा भयानक इस बात की जानकारी थी कि हमारे संपूर्ण प्रवास के दौरान हिमपात लगभग दर्जन आरोहियों और कुलियों को प्रतिदिन छुता रहेगा।</p>
            
            <p>दूसरे दिन नए आनेवाले अधिकारी सांग को हम हिमपात के आधे रास्ते तक ले गए। डॉ. मीनू मेहता ने हमें एल्यूमिनियम की सीढ़ियों से अस्थायी पुलों का बनाना, लट्ठों और रस्सियों का उपयोग, बर्फ़ की आड़ी-तिरछी दीवारों पर रस्सियों को बाँधना और हमारे अग्रिम दल के अभियंत्रिकी कार्यों के बारे में विस्तृत जानकारी दी।</p>
            
            <p>तीसरा दिन हिमपात से कैंप-एक तक सामान ढोकर चढ़ाई का अभ्यास करने के लिए निश्चित था। रीता गोंबू तथा मैं साथ-साथ चढ़ रहे थे। हमारे पास एक वॉकी-टॉकी था, जिससे हम अपने हर कदम की जानकारी बेस कैंप पर दे रहे थे। कर्नल खुल्लर उस समय खुश हुए। हमें उन्होंने अपने पहुँचने की सूचना दी क्योंकि कैंप-एक पर पहुँचनेवाली केवल हम दो महिलाएँ थीं। आंगदोरजी, लोपसांग और गगन बिस्सा अंततः साथ पहुँच गए और उनतीस अप्रैल को सत्तानवे सौ मीटर पर उन्होंने कैंप-चार लगाया। यह संतोषजनक प्राप्ति थी।</p>
            
            <p>जब अप्रैल में बेस कैंप में थी, तेनजिंग अपनी सबसे छोटी पुत्री डेकी के साथ हमारे पास आए। उन्होंने इस बात पर विशेष महत्व दिया कि दल के प्रत्येक सदस्य और प्रत्येक शेरपा कुली से बातचीत की जाए। जब मेरी बारी आई, मैंने अपना परिचय यह कहकर दिया कि मैं बिल्कुल ही <span class="highlight-vocab">नौसिखिया<div class="vocab-tooltip">नया सीखनेवाला</div></span> हूँ और एवरेस्ट मेरा पहला अभियान है। तेनजिंग हँसे और मुझसे कहा कि एवरेस्ट उनके लिए भी पहला अभियान है, लेकिन यह भी स्पष्ट किया कि शिखर पर पहुँचने से पहले उन्हें सात बार एवरेस्ट पर जाना पड़ा था। फिर अपना हाथ मेरे कंधे पर रखते हुए उन्होंने कहा, "तुम एक पक्की पर्वतीय लड़की लगती हो। तुम्हें तो शिखर पर पहले ही प्रयास में पहुँचना चाहिए।"</p>
            
            <p>पंद्रह से सोलह मई उन्नीस सौ चौरासी को बुद्ध पूर्णिमा के दिन मैं ल्होत्से की बर्फ़ीली सीधी ढलान पर लगाए सुंदर रंगीन नायलॉन के बने तंबू के कैंप-तीन में थी। कैंप में दस और व्यक्ति थे। लोपसांग, तशारिंग मेरे तंबू में थे, एन.डी. शेरपा तथा और आठ अन्य शरीर से मजबूत और ऊँचाइयों में रहनेवाले शेरपा दूसरे तंबुओं में थे। मैं गहरी नींद में सोई हुई थी कि रात में साढ़े बारह बजे के लगभग मेरे सिर के पिछले हिस्से में किसी एक सख्त चीज़ के टकराने से मेरी नींद अचानक खुल गई और साथ ही एक ज़ोरदार धमाका भी हुआ। मुझे महसूस हुआ कि एक ठंडी, बहुत भारी कोई चीज़ मेरे शरीर पर से मुझे कुचलती हुई चल रही है। मुझे साँस लेने में भी कठिनाई हो रही थी।</p>
            
            <p>यह क्या हो गया था? एक लंबा बर्फ़ का पिंड हमारे कैंप के ठीक ऊपर ल्होत्से ग्लेशियर से टूटकर नीचे आ गिरा था और उसके <span class="highlight-vocab">विशालकाय<div class="vocab-tooltip">बहुत बड़े आकार का</div></span> पुँज बना गया था। हिमखंडों, बर्फ़ के टुकड़ों तथा जमी हुई बर्फ़ के इस विशालकाय पुँज ने, एक एक्सप्रेस रेलगाड़ी की तेज़ गति और भीषण गरज के साथ, सीधी ढलान से नीचे आते हुए हमारे कैंप को तहस-नहस कर दिया। वास्तव में हर व्यक्ति को चोट लगी थी। यह एक आश्चर्य था कि किसी की मृत्यु नहीं हुई थी।</p>
            
            <p>लोपसांग अपनी स्विस नाइफ की मदद से मेरे तंबू का रास्ता साफ़ करने में सफल हो गए थे और तुरंत ही मेरी बेहोशी से मुझे बचाने की कोशिश में लग गए। थोड़ी-सी भी देर का सीधा अर्थ था मृत्यु। बर्फ़-बड़े हिमपिंडों को मुश्किल से हटाते हुए उन्होंने मेरे चारों तरफ़ की कड़े जमे बर्फ़ की खुदाई की और मुझे उस बर्फ़ की कब्र से निकाल बाहर खींच लाने में सफल हो गए।</p>
            
            <p>सुबह तक सारे सुरक्षित आ गए थे और सोलह मई को प्रातः आठ बजे तक हम प्रायः सभी कैंप-दो पर पहुँच गए। जिस शेरपा की टाँग की हड्डी टूट गई थी, उसे एक खुद के बनाए स्ट्रेचर पर लिटाकर नीचे लाए। हमारे नेता कर्नल खुल्लर के शब्दों में, "यह इतनी ऊँचाई पर सुरक्षा-कार्य का एक ज़बरदस्त साहसिक कार्य था।"</p>
            
            <p>सभी समस्त सदस्यों को चोटें अथवा टूटी हड्डियाँ आदि के कारण बेस कैंप में भेजना पड़ा। तभी कर्नल खुल्लर मेरी तरफ़ मुड़कर कहने लगे, "क्या तुम भयभीत थी?" "जी हाँ!" "क्या तुम वापस जाना चाहोगी?" "नहीं", मैंने बिना किसी झिझक के उत्तर दिया।</p>
            
            <p>जैसे ही मैं साउथ कौल कैंप पहुँची, मैंने अगले दिन की अपनी महत्त्वपूर्ण चढ़ाई की तैयारी शुरू कर दी। मैंने खाना, कुकिंग गैस तथा कुछ ऑक्सीजन सिलिंडर इकट्ठे किए। जब दोपहर डेढ़ बजे बिस्सा आया, उसने मुझे चाय के लिए पानी गरम किया। जैस, जय और मीनू अभी बहुत पीछे थे। मैं चिंतित थी क्योंकि मुझे अगले दिन उनके साथ ही चढ़ाई करनी थी। वे धीरे-धीरे आ रहे थे क्योंकि वे भारी बोझ लेकर और बिना ऑक्सीजन के चल रहे थे।</p>
            
            <p>दोपहर बाद मैंने दल के दूसरे सदस्यों की मदद करने और अपने एक थर्मस को जूस से और दूसरे को गरम चाय से भरने के लिए नीचे जाने का निश्चय किया। मैंने बर्फीली हवा में ही तंबू से बाहर कदम रखा। जैसे ही मैं कैंप क्षेत्र से बाहर आ रही थी मेरी मुलाकात मीनू से हुई। और मैंने जय अभी कुछ पीछे था। मुझे जय जनेवा छाप की चोटी के ठीक नीचे मिला। उसने कृतज्ञतापूर्वक चाय वगैरह पी लेकिन मुझे और आगे जाने से रोकने की कोशिश की। मगर मुझे 'की' से भी मिलना था। थोड़ी सी और आगे उतरने पर मैंने 'की' को देखा। वह मुझे देखकर हक्का-बक्का रह गया।</p>
            
            <p>"तुमने इतनी <span class="highlight-vocab">जोखिम<div class="vocab-tooltip">ख़तरा</div></span> भरी यात्रा क्यों की बछेंद्री?" मैंने उसे दृढ़तापूर्वक कहा, "मैं भी एक <span class="highlight-vocab">पर्वतारोही<div class="vocab-tooltip">पर्वत पर चढ़नेवाला</div></span> हूँ, इसीलिए इस दल में आई हूँ। शारीरिक रूप में मैं ठीक हूँ। इसलिए मुझे अपने दल के सदस्यों की मदद क्यों नहीं करनी चाहिए।" 'की' हँसा और उसने पेय पदार्थ से प्यास बुझाई, लेकिन उसने मुझे अपना किट ले जाने नहीं दिया।</p>
            
            <p>थोड़ी देर बाद साउथ कौल कैंप से ल्हाटू और बिस्सा हमें मिलने नीचे उतर आए। और हम सब साउथ कौल पर जैसी भी सुरक्षा और आराम की जगह उपलब्ध थी, उस पर लौट आए। साउथ कौल पृथ्वी पर बहुत अधिक कठोर जगह के नाम से प्रसिद्ध है।</p>
            
            <p>अगले दिन मैं सुबह चार बजे उठ गई। बर्फ़ पिघलाकर और चाय बनाई। कुछ बिस्कुट और आधी चॉकलेट का हल्का नाश्ता करने के बाद मैं लगभग साढ़े पाँच बजे अपने तंबू से निकल पड़ी। आंगदोरजी बाहर खड़ा था और कोई आसपास नहीं था।</p>
            
            <p>आंगदोरजी बिना ऑक्सीजन के ही चढ़ाई करनेवाला था, लेकिन इसके कारण उसके पैर ठंडे पड़ जाते थे। इसलिए वह ऊँचाई पर लंबे समय तक खुले में और रात्रि में शिखर कैंप पर नहीं रहना चाहता था। इसलिए उसे या तो उसी दिन चोटी तक चढ़कर वापस आ जाना था अथवा साउथ कौल तक लौटना था।</p>
            
            <p>वह तुरंत ही चढ़ाई शुरू करना चाहता था, और उसने मुझसे पूछा, "क्या तुम मेरे साथ जाना चाहोगी? एक ही दिन में साउथ कौल से चोटी तक जाना और वापस आना बहुत कठिन और श्रमसाध्य होगा।" इसके अलावा यदि आंगदोरजी के पैर ठंडे पड़ गए तो उसके लौटकर आने का भी जोखिम था। मुझे फिर भी आंगदोरजी पर विश्वास था और साथ-साथ मैं <span class="highlight-vocab">आरोहण<div class="vocab-tooltip">चढ़ना, ऊपर की ओर जाना</div></span> की क्षमता और <span class="highlight-vocab">कर्मठता<div class="vocab-tooltip">काम में कुशलता, कर्म के प्रति निष्ठा</div></span> के बारे में भी आश्वस्त थी। अन्य कोई भी व्यक्ति इस समय हाथ बढ़ाने के लिए तैयार नहीं था।</p>
            
            <p>सुबह छह बजकर बीस मिनट पर जब आंगदोरजी और मैं साउथ कौल से बाहर आ निकले तो दिन ऊपर चढ़ आया था। हलकी-हलकी हवा चल रही थी, लेकिन ठंड भी बहुत अधिक थी। मैं अपने <span class="highlight-vocab">आरोही<div class="vocab-tooltip">ऊपर चढ़ने वाला</div></span> उपकरण में काफ़ी सुरक्षित और गर्म थी। हमने बर्फ़ीली रस्सी के टुकड़े का उपयोग किया। आंगदोरजी गति से ऊपर चढ़ते गए और मुझे भी उनके साथ चलने में कोई कठिनाई नहीं हुई।</p>
            
            <p>जमे हुए बर्फ़ की सीधी ढलान इतनी सख्त और भुरभुरी थी, मानो शीशे की चादर बिछी हो। हमें बर्फ़ काटने के फावड़े का इस्तेमाल करना ही पड़ा और मुझे इतनी सख्त से फावड़ा चलाना पड़ा जिससे कि उस जमे हुए बर्फ़ की धरती को फ़ावड़े के दाँते काट सकें। मैंने उन ख़तरनाक स्थलों पर हर कदम अच्छी तरह सोच-समझकर उठाया।</p>
            
            <p>दो घंटे से कम समय में ही हम शिखर कैंप पर पहुँच गए। आंगदोरजी ने पीछे मुड़कर देखा और मुझसे कहा कि क्या मैं थक गई हूँ। मैंने जवाब दिया, "नहीं।" जिसे सुनकर वह बहुत अधिक आश्चर्यचकित और आनंदित हुए। उन्होंने कहा कि पहलेवाले दल ने शिखर कैंप पर पहुँचने में चार घंटे लगाए थे और यदि हम इसी गति से चलते रहे तो हम शिखर पर दोपहर एक बजे तक पहुँच जाएँगे।</p>
            
            <p>ल्हाटू हमारे पीछे-पीछे आ रहा था और जब हम दक्षिणी शिखर के नीचे आराम कर रहे थे, वह हमारे पास पहुँच गया। थोड़ी-थोड़ी चाय पीने के बाद हमने फिर चढ़ाई शुरू की। ल्हाटू एक नायलॉन की रस्सी लाया था। इसलिए आंगदोरजी और मैं रस्सी के सहारे चढ़े। ल्हाटू एक और साथ ही रस्सी पकड़े हुए बीच में चला। उसने रस्सी अपनी सुरक्षा की बजाय हमारे संतुलन के लिए पकड़ी हुई थी। ल्हाटू ने ध्यान दिलाया कि मैं इन ऊँचाइयों के लिए अनावश्यक, अत्यधिक, भार ऑक्सीजन की आपूर्ति कर, लगभग ढाई लीटर ऑक्सीजन प्रति मिनट की दर से लेकर चल रही थी। मेरे रेगुलेटर पर जैसे ही उसने ऑक्सीजन की आपूर्ति बढ़ाई, मुझे महसूस हुआ कि सपाट और कठिन चढ़ाई भी अब आसान लग रही थी।</p>
            
            <p>दक्षिणी शिखर के ऊपर हवा की गति बढ़ गई थी। उस ऊँचाई पर तेज़ हवा के कारण भुरभुरे बर्फ़ के कण चारों तरफ़ उड़ रहे थे, जिससे दृश्यता शून्य तक आ गई थी। अनेक बार देखा कि केवल थोड़ी दूर के बाद कोई ऊँची चढ़ाई नहीं है। ढलान एकदम सीधा नीचे चला गया है। मेरी साँस मानों रुक गई थी। मुझे विचार था कि सफलता बहुत नज़दीक है। <strong>तेईस मई उन्नीस सौ चौरासी के दिन दोपहर के एक बजकर सात मिनट पर मैं एवरेस्ट की चोटी पर खड़ी थी। एवरेस्ट की चोटी पर पहुँचनेवाली मैं प्रथम भारतीय महिला थी।</strong></p>
            
            <p>एवरेस्ट शंकु की चोटी पर इतनी जगह नहीं थी कि दो व्यक्ति साथ-साथ खड़े हो सकें। चारों तरफ़ हज़ारों मीटर लंबी सीधी ढलान को देखते हुए हमारे सामने प्रश्न सुरक्षा का था। हमने पहले बर्फ़ के फ़ावड़े से बर्फ़ की खुदाई कर अपने आपको सुरक्षित रूप से स्थिर किया। इसके बाद, मैंने अपने घुटनों के बल बैठी, बर्फ़ पर अपने माथे को लगाकर मैंने 'सागरमाथे' के ताज का चुंबन लिया। बिना उठे ही मैंने अपने थैले से दुर्गा माँ का चित्र और हनुमान चालीसा निकाला। मैंने इनको अपने साथ लाए लाल कपड़े में लपेटा, छोटी-सी पूजा-अर्चना की और इनको बर्फ़ में दबा दिया। आनंद के इस क्षण में मुझे अपने माता-पिता का ध्यान आया।</p>
            
            <p>जैसे ही मैं उठी, मैंने अपने हाथ जोड़े और मैं अपने रज्जू-नेता आंगदोरजी के प्रति आदर भाव से झुकी। आंगदोरजी जिन्होंने मुझे प्रोत्साहित किया और मुझे सहज लक्ष्य तक पहुँचाया। मैंने उन्हें बिना ऑक्सीजन के एवरेस्ट की दूसरी चढ़ाई चढ़ने पर बधाई भी दी। उन्होंने मुझे गले से लगाया और मेरे कानों में फुसफुसाया, "दीदी, तुमने अच्छी चढ़ाई की। मैं बहुत प्रसन्न हूँ।"</p>
            
            <p>कुछ देर बाद सोनम पुलज़र पहुँचे और उन्होंने फोटो लेने शुरू कर दिए। इस समय तक ल्हाटू ने हमारे नेता को एवरेस्ट पर हम चारों के होने की सूचना दे दी थी। तब मेरे हाथ में वॉकी-टॉकी दिया गया। कर्नल खुल्लर हमारी सफलता से बहुत प्रसन्न थे। मुझे बधाई देते हुए उन्होंने कहा, "मैं तुम्हारी इस <span class="highlight-vocab">अनूठी<div class="vocab-tooltip">अनोखी, विशेष</div></span> <span class="highlight-vocab">उपलब्धि<div class="vocab-tooltip">प्राप्ति</div></span> के लिए तुम्हारे माता-पिता को बधाई देना चाहूँगा!" वे बोले कि देश को तुम पर गर्व है और अब तुम ऐसे संसार में वापस जाओगी, जो तुम्हारे अपने पीछे छोड़े हुए संसार से एकदम भिन्न होगा!</p>`
    },
    3: {
        title: "शब्दार्थ और टिप्पणियाँ",
        content: `
            <div class="vocabulary-note">
                <span class="word">अभियान</span> - <span class="definition">चढ़ाई (आगे बढ़ना), किसी काम के लिए प्रतिबद्धता</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">दुर्गम</span> - <span class="definition">जहाँ पहुँचना कठिन हो, कठिन मार्ग</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">हिमपात</span> - <span class="definition">बर्फ़ का गिरना</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">आकर्षित</span> - <span class="definition">मुग्ध होना, आकृष्ट होना</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">अवसाद</span> - <span class="definition">उदासी</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">ग्लेशियर</span> - <span class="definition">बर्फ़ की नदी</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">नौसिखिया</span> - <span class="definition">नया सीखनेवाला</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">विशालकाय</span> - <span class="definition">पुँज बड़े आकार के बर्फ़ के टुकड़े (ढेर)</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">पर्वतारोही</span> - <span class="definition">पर्वत पर चढ़नेवाला</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">आरोहण</span> - <span class="definition">चढ़ना, ऊपर की ओर जाना</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">कर्मठता</span> - <span class="definition">काम में कुशलता, कर्म के प्रति निष्ठा</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">उपलब्धि</span> - <span class="definition">प्राप्ति</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">जोखिम</span> - <span class="definition">ख़तरा</span>
            </div>
            <div class="vocabulary-note">
                <span class="word">अनूठी</span> - <span class="definition">अनोखी, विशेष, अद्वितीय</span>
            </div>
        `
    }
};

// Currently active story part
let currentStoryPart = 1;

// Show specific story part
function showStoryPart(partNumber) {
    console.log(`Showing story part: ${partNumber}`);
    
    // Stop any ongoing narration
    if (window.narrator && window.narrator.currentUtterance) {
        window.narrator.stop();
    }
    
    // Validate part number
    if (!storyContent[partNumber]) {
        console.error(`Story part ${partNumber} not found`);
        return;
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Find and activate the clicked button
    const navButtons = document.querySelectorAll('.story-nav-btn');
    if (navButtons[partNumber - 1]) {
        navButtons[partNumber - 1].classList.add('active');
        navButtons[partNumber - 1].setAttribute('aria-pressed', 'true');
    }
    
    // Update story content
    const storyContentEl = document.getElementById('storyContent');
    if (storyContentEl) {
        storyContentEl.innerHTML = `
            <div class="story-part active">
                <div class="story-part-title">${storyContent[partNumber].title}</div>
                ${storyContent[partNumber].content}
            </div>
        `;
    }
    
    // Update current part
    currentStoryPart = partNumber;
    
    // Remove any paragraph highlights when switching to लेखिका परिचय or कहानी section
    if (partNumber === 1 || partNumber === 2) {
        document.querySelectorAll('.paragraph-highlight').forEach(p => {
            p.classList.remove('paragraph-highlight');
        });
    }
    
    // Automatically start reading if audio is enabled
    setTimeout(() => {
        if (window.narrator && window.narrator.enabled) {
            readCurrentStoryPartAloud();
        }
    }, 500);
    
    // Scroll to top of story content
    if (storyContentEl) {
        storyContentEl.scrollTop = 0;
    }
}

// Read current story part aloud
function readCurrentStoryPartAloud() {
    if (!window.narrator) {
        console.warn('Narrator not available');
        return;
    }
    
    // Stop any ongoing narration
    window.narrator.stop();
    
    // Get current story content
    const currentContent = storyContent[currentStoryPart];
    if (!currentContent) {
        console.error('No content found for current story part');
        return;
    }
    
    // Show reading indicator
    showReadingIndicator();
    
    // Extract text from HTML content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = currentContent.content;
    
    // Remove tooltip content
    tempDiv.querySelectorAll('.vocab-tooltip').forEach(tooltip => {
        tooltip.remove();
    });
    
    // Extract text content
    let textToRead = currentContent.title + ". ";
    textToRead += tempDiv.textContent || tempDiv.innerText || "";
    
    // Clean up the text
    textToRead = textToRead
        .replace(/\s+/g, ' ')
        .replace(/\n/g, ' ')
        .trim();
    
    // Speak the content with paragraph highlighting
    speakWithHighlighting(textToRead);
}

// Show reading indicator
function showReadingIndicator() {
    // Remove any existing indicators
    document.querySelectorAll('.reading-indicator').forEach(indicator => {
        indicator.remove();
    });
    
    // Create new indicator
    const indicator = document.createElement('div');
    indicator.className = 'reading-indicator';
    indicator.innerHTML = `
        <div class="reading-spinner"></div>
        <span>पाठ सुनाया जा रहा है...</span>
    `;
    
    // Add to story content area
    const storyContentEl = document.getElementById('storyContent');
    if (storyContentEl) {
        storyContentEl.appendChild(indicator);
    }
}

// Hide reading indicator
function hideReadingIndicator() {
    document.querySelectorAll('.reading-indicator').forEach(indicator => {
        indicator.classList.add('fade-out');
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.remove();
            }
        }, 500);
    });
}

// Speak text with paragraph highlighting
function speakWithHighlighting(text) {
    if (!window.narrator) return;
    
    // Break text into sentences for highlighting
    const sentences = text.match(/[^.!?।]+[.!?।]+/g) || [text];
    const storyContentEl = document.getElementById('storyContent');
    const paragraphs = storyContentEl ? storyContentEl.querySelectorAll('p') : [];
    
    let currentSentenceIndex = 0;
    let currentParagraphIndex = 0;
    
    function speakNextSentence() {
        if (currentSentenceIndex >= sentences.length) {
            // Finished reading
            hideReadingIndicator();
            // Clear any paragraph highlights
            paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
            return;
        }
        
        // Only apply paragraph highlighting if not in लेखिका परिचय or कहानी section
        if (currentStoryPart !== 1 && currentStoryPart !== 2 && paragraphs[currentParagraphIndex]) {
            // Clear previous highlights
            paragraphs.forEach(p => p.classList.remove('paragraph-highlight'));
            // Highlight current paragraph
            paragraphs[currentParagraphIndex].classList.add('paragraph-highlight');
        }
        
        // Set up callback for when sentence finishes
        window.narrator.onEndCallback = function() {
            currentSentenceIndex++;
            // Move to next paragraph every few sentences
            if (currentSentenceIndex % 3 === 0 && currentParagraphIndex < paragraphs.length - 1) {
                currentParagraphIndex++;
            }
            // Small pause between sentences
            setTimeout(speakNextSentence, 300);
        };
        
        // Speak current sentence
        window.narrator.speak(sentences[currentSentenceIndex]);
    }
    
    // Start reading
    speakNextSentence();
}

// Initialize story content when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show first part by default
    if (typeof showStoryPart === 'function') {
        showStoryPart(1);
    }
});

// Make functions globally available
window.showStoryPart = showStoryPart;
window.readCurrentStoryPartAloud = readCurrentStoryPartAloud;