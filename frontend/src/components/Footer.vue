<template>
    <main>
        <div id="footer_FlexBox">
            <div id="about">
                <h2>About us</h2>
                <pre>
We founded this site to inform the public of the similarity betwen different plants that belong to
the same plant family. The reason why is because their apperances looks similar, and that might
propose a problem since some of the family members are very poisonous. That is why we want to make
the public aware of the importance to tell the difference before touching or eating a plant. </pre>
            </div>

            <p id="copyright">© 2024 Copyright: Charlie, Emma, Filip och Mela </p>
            <pre id="contact">
            If there's an issue with the site or 
            you have an idea on how to improve the site,
            feel free to contact <span>filip@happyplant.com</span>
            </pre>
        </div>
    </main>

</template>

<style scoped>
main {

    padding: 5px 20px;
    border-top: solid 2px lightgrey;
    background-color: rgba(247, 247, 247, 0.6);
}

#footer_FlexBox {
    display: flex;
    align-items: flex-end;

    justify-content: space-between;
}


#about pre,
#about h2 {
    font-size: 16px;
    font-family: 'Times New Roman', Times, serif;
}

#copyright {
    /*
    text-align: center; */
    font-size: 12px;
}

#contact {
    font-size: 16px;
    font-family: 'Times New Roman', Times, serif;
}


span {
    color: darkblue;
    text-decoration: underline;
}
</style>
