import { connectToDB } from "@utils/database";
import Prompt from "@models/Prompt";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch data", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { prompt, tag } = await req.json();

  try {
    await connectToDB();

    const exixtingPrompt = await Prompt.findById(params.id);

    if (!exixtingPrompt)
      return new Response("Prompt not found", { status: 404 });

    exixtingPrompt.prompt = prompt;
    exixtingPrompt.tag = tag;

    await exixtingPrompt.save();

    return new Response(JSON.stringify(exixtingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const p = await Prompt.findByIdAndRemove(params.id);
    console.log(p);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
}
