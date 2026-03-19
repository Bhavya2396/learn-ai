/**
 * Story content and functionality for Shukratarey ke Samaan
 */

// Global variables to track narration state
let autoNarrationEnabled = false;
let narrationDisabledByUser = false;
let currentParagraphIndex = 0;
let paragraphElements = [];

// Story parts based on Chapter 5 content
const storyParts = [
    {
        id: 1,
        title: "लेखक परिचय", 
        content: `
            <!-- OLD CONTENT REMOVED/HIDDEN -->
            <!-- UPDATED CONTENT BELOW -->
            
            <div class="story-part-title">स्वामी आनंद</div>
            <div class="story-part-title">(1887-1976)</div>
            
            <p>संन्यासी स्वामी आनंद का जन्म गुजरात के काठियावाड़ जिले के किमड़ी गाँव में सन् 1887 में हुआ। इनका मूल नाम हिम्मतलाल था। जब ये दस साल के थे तभी कुछ साधु इन्हें अपने साथ हिमालय की ओर ले गए और इनका नामकरण किया— स्वामी आनंद। 1907 में स्वामी आनंद स्वतंत्रता आंदोलन से जुड़ गए। महाराष्ट्र से कुछ समय तक 'तरुण हिंद' अखबार निकाला, फिर बाल गंगाधर तिलक के 'केसरी' अखबार से जुड़ गए। 1917 में गाँधीजी के संसर्ग में आने के बाद उन्हीं के निर्देशन में 'नवजीवन' और 'यंग इंडिया' की प्रसार व्यवस्था सँभाली। इसी बहाने इन्हें, गाँधीजी और उनके निजी सहयोगी महादेव भाई देसाई और बाद में प्यारेलाल जी को निकट से जानने का अवसर मिला।</p>
            
            <p>मूलतः गुजराती भाषा में लिखे गए प्रस्तुत पाठ 'शुक्रतारे के समान' में लेखक ने गाँधीजी के निजी सचिव महादेव भाई देसाई की बेजोड़ प्रतिभा और व्यस्ततम दिनचर्या को उकेरा है। लेखक अपने इस रेखाचित्र के नायक के व्यक्तित्व और उसकी ऊर्जा, उनकी लगन और प्रतिभा से अभिभूत है। महादेव भाई की सरलता, सज्जनता, निष्ठा, समर्पण, लगन और निरभिमान को लेखक ने पूरी ईमानदारी से शब्दों में पिरोया है। इनकी लेखनी महादेव के व्यक्तित्व का ऐसा चित्र खींचने में सफल रही है कि पाठक को महादेव भाई पर अभिमान हो आता है।</p>
            
            <p>लेखक के अनुसार कोई भी महान व्यक्ति, महानतम कार्य तभी कर पाता है, जब उसके साथ ऐसे सहयोगी हों जो उसकी तमाम इतर चिंताओं और उलझनों को अपने सिर ले लें। गाँधीजी के लिए महादेव भाई और भाई प्यारेलाल जी ऐसी ही शख्सियत थे।</p>
            
            <!-- END OF UPDATED CONTENT -->
        `
    },
    {
        id: 2,
        title: "मुख्य पाठ",
        content: `
            <!-- OLD CONTENT REMOVED/HIDDEN -->
            <!-- UPDATED COMPLETE MAIN TEXT CONTENT BELOW -->
            
            <div class="story-part-title">शुक्रतारे के समान</div>
            
            <p>आकाश के तारों में <span class="highlight-vocab" data-meaning="शुक्र ग्रह, सबसे चमकीला तारा">शुक्र<span class="vocab-tooltip">शुक्र ग्रह, सबसे चमकीला तारा</span></span> को कोई जोड़ नहीं। शुक्र चंद्र का साथी माना गया है। उसकी आभा-प्रभा का वर्णन करने में संसार के कवि थकते नहीं। फिर भी नक्षत्र मंडल में कलंगी-रूप इस तेजस्वी तारे को दुनिया या तो एन शाम के समय, बड़े सवेरे घटें-दो घंटे से अधिक देख नहीं पाती। इसी तरह भाई महादेव जी आधुनिक भारत की स्वतंत्रता के उपकाल में अपनी वैसी ही आभा से हमारे आकाश को जगमगाकर, देश और दुनिया को मुग्ध करके, शुक्रतारे की तरह ही अचानक अस्त हो गए। सेवाधर्म का पालन करने के लिए इस धरती पर जनमे स्वर्गीय महादेव देसाई गाँधीजी के मंत्री थे। मित्रों के बीच विनोद में अपने को गाँधीजी का <span class="highlight-vocab" data-meaning="बोझ उठाने वाला, कुली">'हम्माल'<span class="vocab-tooltip">बोझ उठाने वाला, कुली</span></span> कहने में और कभी-कभी अपना परिचय उनके <span class="highlight-vocab" data-meaning="सभी प्रकार के कार्यों को करने में समर्थ व्यक्ति">'पीर-बावरची-भिश्ती-खर'<span class="vocab-tooltip">सभी प्रकार के कार्यों को करने में समर्थ व्यक्ति</span></span> के रूप में देने में वे गौरव का अनुभव किया करते थे।</p>

            <p>गाँधीजी के लिए वे पुत्र से भी अधिक थे। जब सन् 1917 में वे गाँधीजी के पास पहुँचे थे, तभी गाँधीजी ने उनको तत्काल पहचान लिया और उनको अपने उत्तराधिकारी का पद सौंप दिया। सन् 1919 में जलियाँवाला बाग के हत्याकांड के दिनों में पंजाब जाते हुए गाँधीजी को पलवल स्टेशन पर गिरफ्तार किया गया था। गाँधीजी ने उसी समय महादेव भाई को अपना वारिस कहा था। सन् 1929 में महादेव भाई <span class="highlight-vocab" data-meaning="सेतुबंध रामेश्वर से हिमाचल तक विस्तीर्ण">आसेतुहिमाचल<span class="vocab-tooltip">सेतुबंध रामेश्वर से हिमाचल तक विस्तीर्ण</span></span>, देश के चारों कोनों में, समूचे देश के दुलारे बन चुके थे।</p>

            <p>इसी बीच पंजाब में फ़ौजी क़ानून के कारण जो कहर बरसाया गया था, उसका ब्योरा रोज़-रोज़ आने लगा। पंजाब के अधिकतर नेताओं को गिरफ़्तार करके फ़ौजी क़ानून के तहत जन्म-क़ैद की सज़ाएँ देकर <span class="highlight-vocab" data-meaning="आजीवन कैद की सज़ा पाए कैदियों को रखने का स्थान">कालापानी<span class="vocab-tooltip">आजीवन कैद की सज़ा पाए कैदियों को रखने का स्थान</span></span> भेज दिया गया। लाहौर के मुख्य राष्ट्रीय अंग्रेजी दैनिक 'ट्रिब्यून' के संपादक श्री कालिनाथ राय को 10 साल की जेल की सज़ा मिली।</p>

            <p>गाँधीजी के सामने ज़ुल्मों और अत्याचारों की कहानियाँ पेश करने के लिए आने वाले पीड़ितों के दल-के-दल गाँधीजी के <span class="highlight-vocab" data-meaning="गाँधीजी के निवास स्थान का नाम">मणिवभ<span class="vocab-tooltip">गाँधीजी के निवास स्थान का नाम</span></span> पर उमड़ते रहते थे। महादेव उनकी बातों की संक्षिप्त टिप्पणियाँ तैयार करके उनको गाँधीजी के सामने पेश करते थे और आनेवालों के साथ उनकी <span class="highlight-vocab" data-meaning="आमने-सामने">रू-ब-रू<span class="vocab-tooltip">आमने-सामने</span></span> मुलाकातें भी करवाते थे। गाँधीजी बंबई के मुख्य राष्ट्रीय अंग्रेजी दैनिक <span class="highlight-vocab" data-meaning="एक प्रसिद्ध अंग्रेजी अखबार">'बांबे क्रानिकल'<span class="vocab-tooltip">एक प्रसिद्ध अंग्रेजी अखबार</span></span> में इन सब विषयों पर लेख लिखा करते थे। क्रानिकल में जगह की तंगी रहती थी।</p>

            <p>कुछ ही दिनों में 'क्रानिकल' के निडर अंग्रेज संपादक हार्नीमैन को सरकार ने देश-निकाले की सज़ा देकर इंग्लैंड भेज दिया। उन दिनों बंबई के तीन नए नेता थे। शंकर लाल बैकर, उमर सोबानी और जमनादास द्वारकादास। इनमें अतिम श्रीमती बेसेंट के अनुयायी थे। ये नेता 'यंग इंडिया' नाम का एक अंग्रेजी साप्ताहिक भी निकालते थे। लेकिन उसमें 'क्रानिकल' वाले हार्नीमैन ही मुख्य रूप से लिखते थे। उनको देश निकाले पर मिलने के बाद इन लोगों को हर हफ़्ते साप्ताहिक के लिए लिखनेवालों की कमी रहने लगी। ये तीनों नेता गाँधीजी के परम प्रशंसक और उनके सत्याग्रह-आंदोलन में बंबई के बेजोड़ नेता भी थे। इन्होंने गाँधीजी से विनती की कि वे 'यंग इंडिया' के संपादक बन जाएँ। गाँधीजी को तो इसकी सख्त ज़रूरत ही थी। उन्होंने विनती तुरंत स्वीकार कर ली।</p>

            <p>गाँधीजी का काम इतना बढ़ गया कि साप्ताहिक पत्र भी कम पड़ने लगा। गाँधीजी ने 'यंग इंडिया' को हफ़्ते में दो बार प्रकाशित करने का निश्चय किया।</p>

            <p>हर रोज़ का पत्र-व्यवहार और मुलाकातें, आम सभाएँ आदि कामों के अलावा 'यंग इंडिया' साप्ताहिक में छापने के लेख, टिप्पणियाँ, पंजाब के मामलों का सारसंक्षेप और गाँधीजी के लेख यह सारी सामग्री भी हम तीन दिन में तैयार करते।</p>

            <p>'यंग इंडिया' के पीछे-पीछे 'नवजीवन' भी गाँधीजी के पास आ गया और दोनों साप्ताहिक अहमदाबाद को निकलने लगे। छह महीनों के लिए मैं भी साबरमती आश्रम में रहने पहुँचा। शुरू में ग्राहकों के हिसाब-किताब की और साप्ताहिकों को डाक में डलवाने की व्यवस्था मेरे जिम्मे रही। लेकिन कुछ ही दिनों के बाद संपादन सहित दोनों साप्ताहिकों की और छपाखाने की सारी व्यवस्था मेरे जिम्मे आ गई। गाँधीजी और महादेव का सारा समय देश भर में बीतने लगा। ये जहाँ भी होते, वहाँ से कामों और कार्यक्रमों की भारी भीड़ के बीच भी समय निकालकर लेख लिखते और भेजते।</p>

            <p>सब प्रातों के उग्र और उदार दशकभक्त, क्रांतिकारी और देश-विदेश के <span class="highlight-vocab" data-meaning="प्रवीण, उत्तम गुणों से युक्त">धुरंधर<span class="vocab-tooltip">प्रवीण, उत्तम गुणों से युक्त</span></span> लोग, संवाददाता आदि गाँधीजी को पत्र लिखते और गाँधीजी 'यंग इंडिया' के कॉलमों में उनकी चर्चा किया करते। महादेव गाँधीजी की यात्राओं के और प्रतिदिन की उनकी गतिविधियों का साप्ताहिक विवरण भेजा करते।</p>

            <p>इसके अलावा महादेव, देश-विदेश के अग्रगण्य समाचार-पत्र, जो आँखों में तेल डालकर गाँधीजी की प्रतिदिन की गतिविधियों को देखा करते थे और उन पर बराबर टीका-टिप्पणी करते रहते थे, उनको आड़े हाथों लेने वाले लेख भी समय-समय पर लिखा करते थे। बेजोड़ कॉलम, भरपूर <span class="highlight-vocab" data-meaning="चौकस रहना, नज़र रखना">चौंकाई<span class="vocab-tooltip">चौकस रहना, नज़र रखना</span></span>, ऊँचे-से-ऊँचे ब्रिटिश समाचार-पत्रों की परंपराओं को अपनाकर चलने का गाँधीजी का आग्रह और <span class="highlight-vocab" data-meaning="दृढ़, जिसे अपने मत या विश्वास का अधिक आग्रह हो">कट्टर<span class="vocab-tooltip">दृढ़, जिसे अपने मत या विश्वास का अधिक आग्रह हो</span></span> से कट्टर विरोधियों के साथ भी पूरी-पूरी सत्यनिष्ठा में से उत्पन्न होनेवाली विनय-विवेक-युक्त विवाद करने की गाँधीजी की तालीम इन सब गुणों में तीव्र मतभेदों और विरोधी प्रचार के बीच भी देश-विदेश के सारे समाचार-पत्रों की दुनिया में और ऐंग्लो-इंडियन समाचार-पत्रों के बीच भी व्यक्तिगत रूप से एम. डी. को सबका <span class="highlight-vocab" data-meaning="प्यारा, दुलारा">लाड़ला<span class="vocab-tooltip">प्यारा, दुलारा</span></span> बना दिया था।</p>

            <p>गाँधीजी के पास आने के पहले विधार्थी अवस्था में महादेव ने सरकार के अनुवाद-विभाग में नौकरी की थी। नरहरि भाई उनके <span class="highlight-vocab" data-meaning="घनिष्ठ मित्र">जिगरी दोस्त<span class="vocab-tooltip">घनिष्ठ मित्र</span></span> थे। दोनों एक साथ वकालत पढ़ते थे। दोनों ने अहमदाबाद में वकालत में साथ-साथ ही शुरू की थी। इस <span class="highlight-vocab" data-meaning="व्यवसाय">पेशे<span class="vocab-tooltip">व्यवसाय</span></span> में आमतौर पर स्वार्थ को सफेद और सफ़ेद को स्वार्थ करना होता है। साहित्य और संस्कार के साथ इसका कोई संबंध नहीं। लेकिन इन दोनों ने तो उसी समय से टैगोर, शरदचन्द्र आदि के साहित्य को उलट्न-पुलटन शुरू कर दिया था। 'चित्रगदा', 'कच-देवयानी' को कथा पर टैगोर द्वारा रचित 'विदाई का अभिशाप' शीर्षक नाटिका, 'शरद बाबू की कहानियाँ' आदि अनुवाद उस समय की उनकी साहित्यिक गतिविधियों की देन है।</p>

            <p>साहित्यिक पुस्तकों की तरह ही महादेव वर्तमान राजनीतिक प्रवाहों और घटनाओं से संबंधित <span class="highlight-vocab" data-meaning="अब तक का, वर्तमान से संबंध रखनेवाला">अद्यतन<span class="vocab-tooltip">अब तक का, वर्तमान से संबंध रखनेवाला</span></span> जानकारी वाली पुस्तकें भी पढ़ते रहते थे। हिंदुस्तान से संबंधित देश-विदेश की ताज़ी-से-ताज़ी राजनीतिक गतिविधियाँ और चर्चाओं की नई-से-नई जानकारी उनके पास मिल सकती थी। सभाओं में, कमेटियों की बैठकों में या दौड़ती रेलगाड़ियों के डिब्बों में ऊपर की बर्थ पर बैठकर, ठूँस-ठूँसकर भरे अपने बड़े-बड़े झोलों में रखे ताज़े-से-ताज़े समाचार-पत्र, मासिक-पत्र और पुस्तकें वे पढ़ते रहते, अथवा 'यंग इंडिया' और 'नवजीवन' के लिए लेख लिखते रहते। लगातार चलनेवाली यात्राओं, हर स्टेशन पर दर्शनों के लिए इकट्ठा हुई जनता के विशाल समुदायों, सभाओं, मुलाकातों, बैठकों, चर्चाओं और बातों के बीच वे स्वयं कब खाते, कब नहाते, कब सोते या कब अपनी हाजते रफ़ा करते, किसी को इसका कोई पता नहीं चल पाता। वे एक घंटे में चार घंटों के काम निपटा देते। काम में रात और दिन के बीच कोई फ़र्क शायद ही कभी रहता हो। वे सूत भी बहुत सुंदर कातते थे। अपनी इतनी सारी व्यस्तताओं के बीच भी वे कातना कभी चूकते नहीं थे।</p>

            <p>बिहार और उत्तर प्रदेश के हज़ारों मील लंबे मैदान गंगा, यमुना और दूसरी नदियों के परम उपकारी, सोने की कीमत वाले <span class="highlight-vocab" data-meaning="तलछट, गाढ़ी चीज़">'गाद'<span class="vocab-tooltip">तलछट, गाढ़ी चीज़</span></span> के बने हैं। आप सौ-सौ कोस चल लीजिए रास्ते में सुपारी फोड़ने लायक एक पत्थर भी कहीं नहीं मिलेगा। इसी तरह महादेव के संपर्क में आने वाले किसी को भी ठेस या ठोकर की बात तो दूर रही, खुरदुरी मिट्टी या कंकरी भी कभी चुभती नहीं थी। उनकी निर्मल प्रतिभा उनके संपर्क में आने वाले व्यक्ति को चन्द्र-शुक्र की प्रभा के साथ दूधों नहला देती थी। उसमें <span class="highlight-vocab" data-meaning="तरबतर, डूबा हुआ">सराबोर<span class="vocab-tooltip">तरबतर, डूबा हुआ</span></span> होने वाले के मन से उनकी इस मोहिनी का नशा कई-कई दिन तक उतरता न था।</p>

            <p>महादेव का समूचा जीवन और उनके सारे कामकाज गाँधीजी के साथ एकरूप होकर इस तरह गुँथ गए थे कि गाँधीजी से अलग अकेले उनकी कल्पना की हो नहीं जा सकती थी। कामकाज की अनगिणत व्यस्तताओं के बीच कोई कल्पना भी न कर सके, इस तरह समय निकालकर लिखी गई दिन-प्रतिदिन की डायरी की वे <span class="highlight-vocab" data-meaning="जिसे गिना न जा सके">अनगिनत<span class="vocab-tooltip">जिसे गिना न जा सके</span></span> अभ्यास पुस्तकें, आज भी मौजूद हैं।</p>

            <p>प्रथम श्रेणी की शिष्ट, संस्कार-संपन्न भाषा और मनोहारी लेखनशैली की ईश्वरीय देन महादेव को मिली थी। यद्यपि गाँधीजी के पास पहुँचने के बाद घमासान लड़ाइयों, आंदोलनों और समाचार-पत्रों की चर्चाओं के भीड़-भरे प्रसंगों के बीच केवल साहित्यिक गतिविधियों के लिए उन्हें कभी समय नहीं मिला, फिर भी गाँधीजी की आत्मकथा 'सत्य के प्रयोग' का अंग्रेजी अनुवाद उन्होंने किया, जो 'नवजीवन' में प्रकाशित होने वाले गुजराती की तरह हर हफ़्ते 'यंग इंडिया' में छपता रहा। बाद में पुस्तक के रूप में उसके अनगिणत संस्करण सारी दुनिया के देशों में प्रकाशित हुए और बिके।</p>

            <p>सन् 1934-35 में गाँधीजी वर्धा के महिला आश्रम में और मगनवाड़ी में रहने के बाद अचानक मगनवाड़ी से चलकर सेवागाँव की सरहद पर एक पेड़ के नीचे जा बैठे। उसके बाद वहाँ एक-दो झोंपड़े बने और फिर धीरे-धीरे मकान बनकर तैयार हुए, तब तक महादेव भाई दुर्गा बहन और चि. नारायण के साथ मगनवाड़ी में रहे। वहीं से वे वर्धा की असह्य गर्मी में रोज़ सुबह पैदल चलकर सेवाग्राम पहुँचते थे। वहीं दिनभर काम करके शाम को वापस पैदल आते थे। जाते-आते पूरे 11 मील चलते थे। रोज़-रोज़ का यह <span class="highlight-vocab" data-meaning="क्रम">सिलसिला<span class="vocab-tooltip">क्रम</span></span> लंबे समय तक चला। कुल मिलाकर इसका जो प्रतिकूल प्रभाव पड़ा, उनकी अकाल मृत्यु के कारणों में वह एक कारण माना जा सकता है।</p>

            <p>इस मौत का घाव गाँधीजी के दिल में उनके जीते जी बना ही रहा। वे भर्तृहरि के भजन की यह पंक्ति हमेशा दोहराते रहे :</p>

            <p>'ए रे जख्म जांगे नहि जोश'— यह घाव कभी योग से भरेगा नहीं।</p>

            <p>बाद के सालों में प्यारेलाल जी से कुछ कहना होता, और गाँधीजी उनको बुलाते तो उस समय भी <span class="highlight-vocab" data-meaning="बिना किसी प्रयास के, आसानी से">अनायास<span class="vocab-tooltip">बिना किसी प्रयास के, आसानी से</span></span> उनके मुँह से 'महादेव' ही निकलता।</p>

            <p><strong>अनुवादक : श्री काशिनाथ त्रिवेदी</strong></p>
            
            <!-- END OF UPDATED COMPLETE MAIN TEXT -->
        `
    },
    {
        id: 3,
        title: "शब्दार्थ और टिप्पणियाँ",
        content: `
            <div class="story-part-title">मुख्य शब्दार्थ</div>
            
            <!-- Enhanced Vocabulary Grid -->
            <div class="vocabulary-grid">
                <div class="vocab-card">
                    <div class="vocab-word">आभा-प्रभा</div>
                    <div class="vocab-meaning">चमक, तेज</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">नक्षत्र-मंडल</div>
                    <div class="vocab-meaning">तारा समूह</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">हम्माल</div>
                    <div class="vocab-meaning">बोझ उठाने वाला, कुली</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">पीर</div>
                    <div class="vocab-meaning">महात्मा, सिद्ध</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">बावर्ची</div>
                    <div class="vocab-meaning">खाना पकाने वाला, रसोइया</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">भिश्ती</div>
                    <div class="vocab-meaning">मशक से पानी ढोने वाला व्यक्ति</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">खर</div>
                    <div class="vocab-meaning">गधा, घास</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">आसेतुहिमाचल</div>
                    <div class="vocab-meaning">सेतुबंध रामेश्वर से हिमाचल तक विस्तीर्ण</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">दुलारे</div>
                    <div class="vocab-meaning">प्यारे</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">ब्योरा</div>
                    <div class="vocab-meaning">विवरण</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">रू-ब-रू</div>
                    <div class="vocab-meaning">आमने-सामने</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">धुरंधर</div>
                    <div class="vocab-meaning">प्रवीण, उत्तम गुणों से युक्त</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">टीका-टिप्पणी</div>
                    <div class="vocab-meaning">व्याख्या, आलोचना</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">चौकसाई</div>
                    <div class="vocab-meaning">चौकस रहना, नज़र रखना</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">कट्टर</div>
                    <div class="vocab-meaning">दृढ़, जिसे अपने मत या विश्वास का अधिक आग्रह हो</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">लाड़ला</div>
                    <div class="vocab-meaning">प्यारा, दुलारा</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">जिगरी दोस्त</div>
                    <div class="vocab-meaning">घनिष्ठ मित्र</div>
                </div>
                <div class="vocab-card">
                    <div class="vocab-word">पेशा</div>
                    <div class="vocab-meaning">व्यवसाय</div>
                </div>
            </div>
            
            <div class="story-part-title">विशेष टिप्पणियाँ</div>
            
            <!-- Enhanced Special Notes -->
            <div class="special-notes-container">
                <div class="special-note-card">
                    <div class="note-term">'पीर-बावर्ची-भिश्ती-खर'</div>
                    <div class="note-explanation">सभी प्रकार के कार्यों को सफलतापूर्वक कर सकने में समर्थ व्यक्ति। महादेव भाई इस प्रकार अपना परिचय देकर अपनी बहुमुखी प्रतिभा और सेवा भावना को दर्शाते थे।</div>
                </div>
                
                <div class="special-note-card">
                    <div class="note-term">श्रीमती बेसेंट (एनी बेसेंट)</div>
                    <div class="note-explanation">स्वाधीनता आंदोलन की महत्वपूर्ण नेता। इन्होंने होम रूल लीग और थियोसॉफिकल सोसाइटी की स्थापना की। भारतीय राष्ट्रीय कांग्रेस की पहली महिला अध्यक्ष भी थीं।</div>
                </div>
                
                <div class="special-note-card">
                    <div class="note-term">शुक्रतारे के समान</div>
                    <div class="note-explanation">शुक्र ग्रह आकाश में सबसे चमकीला तारा है जो केवल सूर्योदय या सूर्यास्त के समय दिखाई देता है। लेखक ने महादेव भाई की तुलना इससे करके उनके तेजस्वी व्यक्तित्व और अकाल मृत्यु को दर्शाया है।</div>
                </div>
            </div>
        `
    }
];

// Show a specific part of the story
function showStoryPart(partNumber) {
    if (partNumber < 1 || partNumber > storyParts.length) return;
    
    console.log(`Loading story part ${partNumber}`);
    
    // Stop any ongoing narration
    if (window.narrator && window.narrator.currentUtterance) {
        window.narrator.stop();
    }
    
    // Update navigation buttons
    document.querySelectorAll('.story-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    // Find the correct button and activate it
    const buttons = document.querySelectorAll('.story-nav-btn');
    if (buttons[partNumber - 1]) {
        buttons[partNumber - 1].classList.add('active');
        buttons[partNumber - 1].setAttribute('aria-pressed', 'true');
    }
    
    // Load content
    const storyContent = document.getElementById('storyContent');
    const part = storyParts[partNumber - 1];
    
    if (part && storyContent) {
        storyContent.innerHTML = `
            <div class="story-part active" data-part="${part.id}">
                ${part.content}
            </div>
        `;
        
        // Add vocabulary hover effects
        addVocabularyEffects();
        
        // Auto-start narration when story part is loaded
        setTimeout(() => {
            if (window.narrator && window.narrator.enabled) {
                console.log(`Auto-starting narration for story part ${partNumber}: ${part.title}`);
                
                // Show brief notification that narration is starting
                showNarrationStartNotification(part.title);
                
                // Start automatic narration
                readCurrentStoryPartAloud();
            } else {
                console.log('Narrator not enabled - narration will not start automatically');
            }
        }, 500); // Small delay to ensure content is fully rendered
        
        console.log(`Story part ${partNumber} loaded successfully`);
    } else {
        console.error(`Story part ${partNumber} not found or content element missing`);
    }
}

// Add vocabulary hover effects
function addVocabularyEffects() {
    document.querySelectorAll('.highlight-vocab').forEach(vocab => {
        vocab.addEventListener('mouseenter', function() {
            const tooltip = this.querySelector('.vocab-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
            }
        });
        
        vocab.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.vocab-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });
        
        vocab.addEventListener('click', function() {
            const meaning = this.getAttribute('data-meaning');
            if (meaning && window.narrator && window.narrator.enabled) {
                window.narrator.speak(meaning);
            }
        });
    });
}

// Read current story part aloud
function readCurrentStoryPartAloud() {
    if (!window.narrator || !window.narrator.enabled) {
        console.log('Narrator not available or disabled');
        return;
    }
    
    const activePart = document.querySelector('.story-part.active');
    if (!activePart) {
        console.log('No active story part found');
        return;
    }
    
    // Stop any ongoing narration
    window.narrator.stop();
    
    // Show reading indicator
    showReadingIndicator();
    
    // Get all paragraphs in the active part
    paragraphElements = activePart.querySelectorAll('p');
    currentParagraphIndex = 0;
    
    if (paragraphElements.length === 0) {
        console.log('No paragraphs found in story part');
        hideReadingIndicator();
        return;
    }
    
    // Start reading from the first paragraph
    readNextParagraph();
}

// Read the next paragraph in sequence
function readNextParagraph() {
    if (currentParagraphIndex >= paragraphElements.length) {
        // Finished reading all paragraphs
        hideReadingIndicator();
        clearParagraphHighlights();
        console.log('Finished reading story part');
        return;
    }
    
    const paragraph = paragraphElements[currentParagraphIndex];
    
    // Clear previous highlights
    clearParagraphHighlights();
    
    // Highlight current paragraph
    paragraph.classList.add('paragraph-highlight');
    
    // Scroll to paragraph if needed
    paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Get text content, excluding vocabulary tooltips
    const textContent = getCleanTextContent(paragraph);
    
    // Set up callback for when this paragraph finishes
    window.narrator.onEndCallback = function() {
        // Remove highlight from current paragraph
        paragraph.classList.remove('paragraph-highlight');
        
        // Move to next paragraph
        currentParagraphIndex++;
        
        // Small pause between paragraphs
        setTimeout(() => {
            readNextParagraph();
        }, 500);
    };
    
    // Speak the paragraph
    window.narrator.speak(textContent);
}

// Get clean text content without HTML tags and tooltips
function getCleanTextContent(element) {
    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true);
    
    // Remove all tooltip elements
    clone.querySelectorAll('.vocab-tooltip').forEach(tooltip => {
        tooltip.remove();
    });
    
    // Get text content
    let text = clone.textContent || clone.innerText || '';
    
    // Clean up extra whitespace
    text = text.replace(/\s+/g, ' ').trim();
    
    return text;
}

// Show reading indicator
function showReadingIndicator() {
    // Remove any existing indicator
    hideReadingIndicator();
    
    const indicator = document.createElement('div');
    indicator.className = 'reading-indicator';
    indicator.innerHTML = `
        <div class="reading-spinner"></div>
        <span>पढ़ा जा रहा है...</span>
    `;
    
    const storyContent = document.getElementById('storyContent');
    if (storyContent) {
        storyContent.appendChild(indicator);
    }
}

// Hide reading indicator
function hideReadingIndicator() {
    const indicator = document.querySelector('.reading-indicator');
    if (indicator) {
        indicator.classList.add('fade-out');
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.remove();
            }
        }, 300);
    }
}

// Clear paragraph highlights
function clearParagraphHighlights() {
    document.querySelectorAll('.paragraph-highlight').forEach(p => {
        p.classList.remove('paragraph-highlight');
    });
}

// Force clear content and reload
function forceReloadContent() {
    const storyContent = document.getElementById('storyContent');
    if (storyContent) {
        storyContent.innerHTML = ''; // Clear all existing content
        setTimeout(() => {
            showStoryPart(1); // Reload first part
            console.log('Content force reloaded - लेखक परिचय updated!');
        }, 100);
    }
}

// Show notification when narration starts
function showNarrationStartNotification(title) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.narration-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'narration-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">🔊</span>
            <span class="notification-text">वाचन प्रारंभ: ${title}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
}

// Debug function - can be called from browser console
window.debugReloadContent = function() {
    console.log('🔄 Debug: Force reloading content...');
    forceReloadContent();
    console.log('✅ Debug: Content reloaded with updated लेखक परिचय');
};

// Initialize story when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load the first story part by default
    if (document.getElementById('storyContent')) {
        forceReloadContent(); // Use force reload to clear any cached content
    }
});
