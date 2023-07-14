import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from dotenv import load_dotenv, find_dotenv
import os
load_dotenv(find_dotenv())


def SendEmail(recipient, token):
    '''
    sends emails to reset password (will have other uses later). We are using office365 as a server
    inputs: recipient: str => email address to send the email to
            token: str => the token used to reset the password
    '''
    mail_subject = 'Reset your Teammaker account password'
    mail_body = '''
    Please click on the following link to reset your password https://www.teammakeronline.com/reset/{}
    If you did not request to reset your password, please disregard this email.
    
    
    The TeamMaker support team,
    
    '''.format(token)

    mimemsg = MIMEMultipart()
    mimemsg['From'] = os.environ.get('SUPPORT_EMAIL')
    mimemsg['To'] = recipient
    mimemsg['Subject'] = mail_subject
    mimemsg.attach(MIMEText(mail_body, 'plain'))
    connection = smtplib.SMTP(host='smtp.office365.com', port=587)
    connection.starttls()
    connection.login(os.environ.get('SUPPORT_EMAIL'),
                     os.environ.get('SUPPORT_PASS'))
    connection.send_message(mimemsg)
    connection.quit()
