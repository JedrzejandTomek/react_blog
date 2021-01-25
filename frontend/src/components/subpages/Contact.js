import React from "react";

export default function Contact() {
  return (
    <div className="content-box">
      <div className="contact-data">
        <h2>Contact data:</h2>
        <h4>Jędrzej Tymiec</h4>
        <h4>Jedrek1692@gmail.com</h4>
        <h4>503-661-721</h4>
      </div>

      <div class="embed-responsive embed-responsive-16by9 col-7">
        {/* <iframe
          class="embed-responsive-item"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1089.
  2499282505507!2d20.98125714584281!3d52.235309540037335!2m3!1f0!2f0!3f0!3m2!1i102
  4!2i768!4f13.1!3m3!1m2!1s0x471ecc83bba9db39%3A0xd443a4cb5e5c884f!2sCh%C5%82odna%2051%2C%200
  0-001%20Warszawa!5e0!3m2!1spl!2spl!4v1580762188453!5m2!1spl!2spl"
          allowfullscreen=""
        ></iframe> */}
        <iframe
          class="embed-responsive-item"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d148784.69646279397!2d18.549942930687997!3d54.36120631393491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46fd731c14d4fa6f%3A0x9bb9fbf163b7be8d!2zR2RhxYRzaw!5e0!3m2!1spl!2spl!4v1611604580379!5m2!1spl!2spl"
          allowfullscreen=""
        ></iframe>
      </div>
    </div>
  );
}
