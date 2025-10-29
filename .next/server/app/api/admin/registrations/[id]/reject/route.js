"use strict";(()=>{var e={};e.id=9994,e.ids=[9994],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},32615:e=>{e.exports=require("http")},35240:e=>{e.exports=require("https")},68621:e=>{e.exports=require("punycode")},76162:e=>{e.exports=require("stream")},17360:e=>{e.exports=require("url")},71568:e=>{e.exports=require("zlib")},64865:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>m,patchFetch:()=>f,requestAsyncStorage:()=>u,routeModule:()=>c,serverHooks:()=>h,staticGenerationAsyncStorage:()=>g});var a={};t.r(a),t.d(a,{POST:()=>l});var o=t(49303),i=t(88716),n=t(60670),s=t(87070),d=t(3360),p=t(86685);async function l(e,{params:r}){try{if(!e.cookies.get("admin_session")?.value)return s.NextResponse.json({error:"Unauthorized"},{status:401});let{id:t}=r,{reason:a}=await e.json();if(!a)return s.NextResponse.json({error:"Rejection reason is required"},{status:400});let{data:o,error:i}=await d.pR.from("registrations").select("*").eq("id",t).single();if(i||!o)return s.NextResponse.json({error:"Registration not found"},{status:404});let{error:n}=await d.pR.from("registrations").update({status:"rejected",rejection_reason:a}).eq("id",t);if(n)return console.error("Error updating registration:",n),s.NextResponse.json({error:"Failed to reject registration"},{status:500});let l=(0,p.xK)(o.team_name,o.team_leader_name,o.registration_number,a);return await (0,p.Cz)(o.team_leader_email,l.subject,l.body,t,"rejection"),s.NextResponse.json({success:!0,message:"Registration rejected and email sent"})}catch(e){return console.error("Reject registration error:",e),s.NextResponse.json({error:"An error occurred"},{status:500})}}let c=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/admin/registrations/[id]/reject/route",pathname:"/api/admin/registrations/[id]/reject",filename:"route",bundlePath:"app/api/admin/registrations/[id]/reject/route"},resolvedPagePath:"/Users/macbookpro/Personal Work/tecverse03/app/api/admin/registrations/[id]/reject/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:u,staticGenerationAsyncStorage:g,serverHooks:h}=c,m="/api/admin/registrations/[id]/reject/route";function f(){return(0,n.patchFetch)({serverHooks:h,staticGenerationAsyncStorage:g})}},3360:(e,r,t)=>{t.d(r,{ag:()=>p,pR:()=>n,v9:()=>d});var a=t(43974),o=t(42023);let i=process.env.SUPABASE_SERVICE_ROLE_KEY,n=(0,a.eI)("https://xplcgqfweqzliiwchmqw.supabase.co",i);async function s(e,r){return o.compare(e,r)}async function d(e,r){try{let{data:t,error:a}=await n.from("admin_users").select("*").eq("email",e).eq("is_active",!0).single();if(a||!t||!await s(r,t.password_hash))return null;await n.from("admin_users").update({last_login:new Date().toISOString()}).eq("id",t.id);let{password_hash:o,...i}=t;return i}catch(e){return console.error("Authentication error:",e),null}}async function p(e,r,t,a=null,o=null,i=null){try{await n.from("activity_logs").insert({admin_id:e,action:r,table_name:t,record_id:a,old_values:o,new_values:i})}catch(e){console.error("Activity log error:",e)}}},86685:(e,r,t)=>{t.d(r,{BK:()=>i,Cz:()=>o,xK:()=>n});var a=t(3360);async function o(e,r,t,o,i){try{return await a.pR.from("email_logs").insert({registration_id:o,email_type:i||"general",recipient_email:e,subject:r,body:t,status:"sent",sent_at:new Date().toISOString()}),console.log(`Email would be sent to ${e}: ${r}`),!0}catch(n){console.error("Email send error:",n);try{await a.pR.from("email_logs").insert({registration_id:o,email_type:i||"general",recipient_email:e,subject:r,body:t,status:"failed",error_message:n instanceof Error?n.message:"Unknown error"})}catch(e){console.error("Email log error:",e)}return!1}}function i(e,r,t,a){return{subject:`🎉 Registration Approved - Techverse 2026`,body:`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Congratulations!</h1>
      <p>Your registration has been approved</p>
    </div>
    <div class="content">
      <p>Dear <strong>${r}</strong>,</p>
      
      <p>We are thrilled to inform you that your team "<strong>${e}</strong>" has been successfully approved for Techverse 2026!</p>
      
      <div class="details">
        <h3>Registration Details</h3>
        <div class="detail-row">
          <span><strong>Registration Number:</strong></span>
          <span>${t}</span>
        </div>
        <div class="detail-row">
          <span><strong>Certificate ID:</strong></span>
          <span>${a}</span>
        </div>
        <div class="detail-row">
          <span><strong>Team Name:</strong></span>
          <span>${e}</span>
        </div>
      </div>
      
      <h3>Next Steps:</h3>
      <ol>
        <li>Save your registration number and certificate ID for future reference</li>
        <li>Check your email regularly for event updates and schedules</li>
        <li>Prepare your team for an amazing competition experience</li>
        <li>Join our Discord/WhatsApp group (link will be sent separately)</li>
      </ol>
      
      <div style="text-align: center;">
        <a href="https://techverse2026.com/dashboard" class="button">View Your Dashboard</a>
      </div>
      
      <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@techverse2026.com">support@techverse2026.com</a></p>
      
      <p>See you at Techverse 2026!</p>
      
      <p>Best regards,<br><strong>Techverse 2026 Team</strong></p>
    </div>
    <div class="footer">
      <p>\xa9 2026 Techverse. All rights reserved.</p>
      <p>This is an automated email. Please do not reply directly to this message.</p>
    </div>
  </div>
</body>
</html>
    `}}function n(e,r,t,a){return{subject:"Registration Status - Techverse 2026",body:`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
    .reason-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; color: #666; padding: 20px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Registration Update</h1>
      <p>Regarding your Techverse 2026 application</p>
    </div>
    <div class="content">
      <p>Dear <strong>${r}</strong>,</p>
      
      <p>Thank you for your interest in Techverse 2026 and for taking the time to submit your application for team "<strong>${e}</strong>".</p>
      
      <div class="details">
        <h3>Registration Information</h3>
        <p><strong>Registration Number:</strong> ${t}</p>
        <p><strong>Team Name:</strong> ${e}</p>
      </div>
      
      <div class="reason-box">
        <h3>Status Update</h3>
        <p>After careful review, we regret to inform you that your registration could not be approved at this time.</p>
        ${a?`<p><strong>Reason:</strong> ${a}</p>`:""}
      </div>
      
      <h3>What You Can Do:</h3>
      <ul>
        <li>Review the registration requirements and reapply if eligible</li>
        <li>Contact us for clarification at <a href="mailto:support@techverse2026.com">support@techverse2026.com</a></li>
        <li>Join our community events and workshops throughout the year</li>
        <li>Stay connected for future Techverse events</li>
      </ul>
      
      <p>We encourage you to continue developing your skills and hope to see you participate in future events!</p>
      
      <div style="text-align: center;">
        <a href="https://techverse2026.com/contact" class="button">Contact Support</a>
      </div>
      
      <p>Best regards,<br><strong>Techverse 2026 Team</strong></p>
    </div>
    <div class="footer">
      <p>\xa9 2026 Techverse. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `}}}};var r=require("../../../../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[8948,5972,3974,2023],()=>t(64865));module.exports=a})();