import { createClient } from "@/utils/supabase/server";

// 1. 認証中のユーザー情報（auth.users のユーザー）を取得
export async function getProfile() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    console.error("Error getting user or user not found:", error);
    return null;
  }
  return user;
}

// 2. アバター画像を Supabase Storage にアップロード
export async function uploadAvatar(formData: FormData) {
  const supabase = createClient();
  const image = formData.get("avatar_url") as File;
  if (!image) {
    console.error("No file provided for avatar.");
    return;
  }
  const filePath = `profile/${image.name}`;

  // ファイルをアップロード
  const { data: uploadData, error } = await supabase.storage
    .from("avatars")
    .upload(filePath, image, { upsert: true }); // 同名ファイルを上書きしたいなら upsert: true

  if (error) {
    console.error("Error uploading avatar:", error);
    // alert() はサーバー環境では機能しないので console.error や throw new Error が望ましい
    return;
  }

  // 公開URLを取得 (バケットの設定による)
  const { data: publicUrlData } = supabase.storage
    .from("avatars")
    .getPublicUrl(filePath);

  // publicUrl を返すなどして、DB に保存するときに使う
  return publicUrlData?.publicUrl;
}

// 3. プロフィール情報を更新
export async function editProfile(formData: FormData) {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    console.error("Error getting user or user not found:", authError);
    return null;
  }
  // 配列型カラムに入れる値を取得
  // フォームで <input name="favorite_place" value="Mountains" /> のように複数指定している想定
  const favorite_place = formData.getAll("favorite_place") as string[];
  const favorite_season = formData.getAll("favorite_season") as string[];

  // 文字列として取得するカラム
  const full_name = formData.get("full_name") as string;
  const bio = formData.get("bio") as string;
  const instagram_url = formData.get("instagram_url") as string;
  const twitter_url = formData.get("twitter_url") as string;
  const facebook_url = formData.get("facebook_url") as string;

  // もしアップロード後のURLを使いたいなら、uploadAvatar() を先に呼んで publicUrl を取得
  // const uploadedUrl = await uploadAvatar(formData);
  // ここでは例として formData にある文字列を直接使う
  const avatar_url = formData.get("avatar_url") as string;

  // profiles テーブルを更新
  const { data, error } = await supabase
    .from("profiles")
    .update({
      full_name,
      bio,
      avatar_url,
      favorite_place,
      favorite_season,
      instagram_url,
      twitter_url,
      facebook_url,
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) {
    throw new Error("Error updating profile:", error);
  }
  return data;
}
