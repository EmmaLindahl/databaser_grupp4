<template>
    <main>
            <h2 id="aboutHeader">About:</h2>
            <div id="about">
                <div id="aboutContent">
                    Our site aims to educate the public about the similarities among plants within the same family. Similar appearances can pose a danger, especially since some family members are highly toxic. We emphasize the importance of distinguishing between them to prevent accidental contact or ingestion. 
                </div>
                <div id="contact">
                        For any site issues or improvement suggestions, contact Filip at <span>filip@happyplant.com</span>
                </div>
            </div>
            <p id="copyright">© 2024 Copyright: Charlie, Emma, Filip och Mela </p>
    </main>

</template>

<style scoped>
main {
    padding: 5px 20px;
    background-color: rgba(247, 247, 247, 0.6);
}
#aboutHeader{
    font-size: 16px;
    font-family: 'Times New Roman', Times, serif;
}

#about{
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
}

#aboutContent,
#contact {
    flex: 1;
    font-size: 14px;
    font-family: 'Times New Roman', Times, serif;
}


#copyright {
    text-align: center;
    font-size: 12px;
}

span {
    color: darkblue;
    text-decoration: underline;
}

@media screen and (max-width: 1000px) {
    #aboutHeader{
        display: none;
    }
    #aboutContent {
        display: none;
    }
    #contact {
    flex: 1;
    width: 100%;
    text-align: center;
}
}
</style>
